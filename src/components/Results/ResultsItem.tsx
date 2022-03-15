import { TypingResult } from 'context/state-types';
import 'styles/Results/ResultsItem.scss';

interface Props {
  title: string;
  results: TypingResult[] | null;
}

const ResultsItem = ({ title, results }: Props) => {
  return (
    <div className="results-item">
      <p className="results-item__title">{title}</p>
      {results &&
        results.map((result, index) => (
          <div key={index} className="results-item__list-item">
            <div>
              <p>{result.wpm}</p>
            </div>
            <div>
              <p>{result.accuracy}%</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ResultsItem;
