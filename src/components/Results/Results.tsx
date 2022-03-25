import { useContext, useEffect, useState } from 'react';
import { TypingContext } from 'context';
import { TypingResult } from 'context/state-types';
import { ReactComponent as IconKeyboardArrowDown } from 'assets/images/keyboard_arrow_down.svg';
import ResultsItem from './ResultsItem';
import 'styles/Results/Results.scss';

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
        <div className="results__wrapper">
          <div className={`results ${isShown ? 'results--expanded' : ''}`}>
            <button className="results__header-button" onClick={toggleIsShown}>
              Results
              <IconKeyboardArrowDown
                className={`results__header-button-icon ${
                  isShown ? 'results__header-button-icon--active' : ''
                }`}
              />
            </button>
            <div className="results__result">
              <div className="results__result__header">
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
