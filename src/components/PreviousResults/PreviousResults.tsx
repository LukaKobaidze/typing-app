import { useContext, useEffect, useState } from 'react';
import { TypingContext } from 'context';
import { TypingResultType } from 'shared/types';
import { ReactComponent as IconKeyboardArrowDown } from 'assets/images/keyboard_arrow_down.svg';
import ResultsItem from './PreviousResultsItem';
import styles from 'styles/PreviousResults/PreviousResults.module.scss';

const PreviousResults = () => {
  const isShowInitial =
    window.localStorage.getItem('resultsExpanded') === 'true';

  const [isShown, setIsShown] = useState(isShowInitial);
  const {
    state: { previousResults },
  } = useContext(TypingContext);

  useEffect(() => {
    window.localStorage.setItem('resultsExpanded', String(isShown));
  }, [isShown]);

  const toggleIsShown = () => {
    setIsShown((prevState) => !prevState);
  };

  return (
    <>
      {previousResults.recent.length !== 0 && (
        <div className={styles['results__wrapper']}>
          <div
            className={`${styles.results} ${
              isShown ? styles['results--expanded'] : ''
            }`}
          >
            <button
              className={styles['results__header-button']}
              onClick={toggleIsShown}
            >
              Results
              <IconKeyboardArrowDown
                className={`${styles['results__header-button-icon']} ${
                  isShown ? styles['results__header-button-icon--active'] : ''
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
                results={[previousResults.best] as TypingResultType[]}
              />
              <ResultsItem title="Recent" results={previousResults.recent} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PreviousResults;
