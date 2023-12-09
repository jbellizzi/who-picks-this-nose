import { useCallback, useState } from "react";

import { Person, PersonWithImage } from "../__generated__/graphql";

export const useGuesses = (todaysPerson: PersonWithImage | undefined) => {
  const [correctGuess, setCorrectGuess] = useState<Person | null>(null);
  const [incorrectGuesses, setIncorrectGuesses] = useState<Person[]>([]);

  const guess = useCallback(
    (person: Person) => {
      if (person.name === todaysPerson?.name) setCorrectGuess(person);
      else setIncorrectGuesses((prevState) => [...prevState, person]);
    },
    [todaysPerson]
  );

  return { correctGuess, incorrectGuesses, guess };
};

export type GuessesContext = ReturnType<typeof useGuesses>;

export const DEFAULT_GUESSES_CONTEXT: GuessesContext = {
  correctGuess: null,
  incorrectGuesses: [],
  guess: () => undefined,
};
