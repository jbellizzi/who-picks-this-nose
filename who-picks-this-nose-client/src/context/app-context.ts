import { createContext, useContext } from "react";

import { PersonWithImage } from "../__generated__/graphql";
import { DEFAULT_GUESSES_CONTEXT, GuessesContext, useGuesses } from "./use-guesses";

interface AppContextData {
  guessesContext: GuessesContext;
}

export const AppContext = createContext<AppContextData>({ guessesContext: DEFAULT_GUESSES_CONTEXT });

export const useAppContext = (todaysPerson: PersonWithImage | undefined) => {
  const guesses = useGuesses(todaysPerson);
  return { guessesContext: guesses };
};

export const useGetAppContext = () => useContext(AppContext);
