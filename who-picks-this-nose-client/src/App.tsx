import { Card, H1, Spinner } from "@blueprintjs/core";
import classNames from "classnames";

import styles from "./App.module.css";
import { Search } from "./components";
import { AppContext, useAppContext } from "./context/app-context";
import { useGetTodaysPerson } from "./hooks";

function App() {
  const { todaysPerson, loadingTodaysPerson, errorTodaysPerson } = useGetTodaysPerson();

  const appContext = useAppContext(todaysPerson);

  if (errorTodaysPerson) return <div>Error: {errorTodaysPerson.message}</div>;

  const { guessesContext } = appContext;
  const { correctGuess } = guessesContext;

  return (
    <AppContext.Provider value={appContext}>
      <div className={styles.App}>
        <div className={styles.header}>
          <H1>Who Picks This Nose?</H1>
          <div className={styles.lastUpdated}>
            Last Updated: <span className={styles.lastUpdatedBold}>Dec 9, 2023</span>
          </div>
        </div>
        <Card className={styles.imgCard} compact>
          {loadingTodaysPerson ? (
            <Spinner className={styles.spinner} />
          ) : (
            <>
              <img
                className={classNames(styles.img, { [styles.hidden]: correctGuess !== null })}
                src={todaysPerson?.noseUrl}
              />
              <img
                className={classNames(styles.img, { [styles.hidden]: correctGuess === null })}
                src={todaysPerson?.faceUrl}
              />
            </>
          )}
        </Card>
        <div className={styles.correctGuess}>{correctGuess?.name}</div>
        <Search />
      </div>
    </AppContext.Provider>
  );
}

export default App;
