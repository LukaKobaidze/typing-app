import { useContext, useEffect, useState } from 'react';
import { TypingContext } from 'context';
import { TypingResult } from 'shared/types';
import { ReactComponent as IconKeyboardArrowDown } from 'assets/images/keyboard_arrow_down.svg';
import ResultsItem from './ResultsItem';
import styles from 'styles/Results/Results.module.scss';

const Results = () => {
  const isShowInitial =
    window.localStorage.getItem('resultsExpanded') === 'true';

  const [isShown, setIsShown] = useState(isShowInitial);
  const {
    state: { results },
  } = useContext(TypingContext);

  useEffect(() => {
    window.localStorage.setItem('resultsExpanded', String(isShown));
  }, [isShown]);

  const toggleIsShown = () => {
    setIsShown((prevState) => !prevState);
  };

  return (
    <>
      {results.recent.length !== 0 && (
        <div className={styles['results__wrapper']}>
          <div
            className={`${styles.results} ${
              isShown && styles['results--expanded']
            }`}
          >
            <button
              className={styles['results__header-button']}
              onClick={toggleIsShown}
            >
              Results
              <IconKeyboardArrowDown
                className={`${styles['results__header-button-icon']} ${
                  isShown && styles['results__header-button-icon--active']
                }`}
              />
            </button>
            <div className={styles['results__result']}>
              <div className={styles['results__result__header']}>
                <p>WPM</p>
                <p>Accuracy</p>
              </div>
              <ResultsItem
                title="Best"
                results={[results.best] as TypingResult[]}
              />
              <ResultsItem title="Recent" results={results.recent} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Results;
