import { InputGroup, Intent, Menu, MenuItem } from "@blueprintjs/core";
import classNames from "classnames";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";

import { Person } from "../../__generated__/graphql";
import { useGetAppContext } from "../../context/app-context";
import { useGetPeople } from "../../hooks";
import styles from "./search.module.css";

interface PersonWithGuess extends Person {
  incorrect: boolean;
}

export const Search = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const { people, loadingPeople, errorPeople } = useGetPeople();

  const [search, setSearch] = useState<string>("");

  const filteredPeople = useMemo(
    () => people?.filter((person) => person.name.toLowerCase().includes(search.toLowerCase())) || [],
    [search, people]
  );

  const { guessesContext } = useGetAppContext();
  const { guess, correctGuess, incorrectGuesses } = guessesContext;

  const filteredNosesWithGuesses: PersonWithGuess[] = useMemo(
    (): PersonWithGuess[] =>
      filteredPeople.map((nose) => ({
        ...nose,
        incorrect: incorrectGuesses.some((guess) => guess.name === nose.name),
      })),
    [filteredPeople, incorrectGuesses]
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const eventHandler = function (event: MouseEvent) {
      const closeSearch = event.target !== searchRef.current && !searchRef.current?.contains(event.target as Node);
      if (closeSearch) setSearch("");
    };
    document.addEventListener("click", eventHandler);

    return () => {
      document.removeEventListener("click", eventHandler);
    };
  }, []);

  useEffect(() => {
    if (correctGuess) setSearch("");
  }, [correctGuess]);

  if (errorPeople) return <div>Error: {errorPeople.message}</div>;

  return (
    <div ref={searchRef}>
      <InputGroup
        disabled={loadingPeople}
        type="search"
        placeholder="Search noses.."
        className={styles.searchInput}
        onChange={handleSearch}
      />
      <Menu className={classNames(styles.menu, "bp5-elevation-1", { [styles.showMenu]: search.length > 0 })}>
        {filteredPeople.length > 0 ? (
          filteredNosesWithGuesses.map((nose) => (
            <MenuItem
              text={nose.name}
              key={nose.name}
              intent={nose.incorrect ? Intent.DANGER : Intent.NONE}
              onClick={() => guess(nose)}
            />
          ))
        ) : (
          <MenuItem text="No results found" disabled />
        )}
      </Menu>
    </div>
  );
};
