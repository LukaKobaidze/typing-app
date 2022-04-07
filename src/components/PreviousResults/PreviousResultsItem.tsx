import { TypingResult } from 'shared/types';
import styles from 'styles/PreviousResults/PreviousResultsItem.module.scss';

interface Props {
  title: string;
  results: TypingResult[] | null;
}

const PreviousResultsItem = ({ title, results }: Props) => {
  return (
    <div className={styles.item}>
      <p className={styles['item__title']}>{title}</p>
      {results &&
        results[0] &&
        results.map((result, index) => (
          <div key={index} className={styles['item__list-item']}>
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

export default PreviousResultsItem;
