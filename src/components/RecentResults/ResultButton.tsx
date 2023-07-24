import { TypingResult } from 'components/Typing/types';
import { getTimeSince } from 'helpers';
import styles from 'styles/RecentResults/ResultButton.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  result: TypingResult;
  includeDate?: boolean;
}

export default function ResultButton(props: Props) {
  const { result, includeDate, className, disabled, ...restProps } = props;

  const timelineLast = result.timeline[result.timeline.length - 1];

  const [testMode, testType] = result.testType?.split(' ') || [];

  return (
    <button
      className={`${styles.button} ${disabled ? styles.disabled : ''} ${className}`}
      disabled={disabled}
      {...restProps}
    >
      <div className={styles.resultItem}>
        <span className={styles.textKey}>wpm</span>
        <span className={styles.textValue}>{timelineLast.wpm}</span>
      </div>
      <div className={styles.resultItem}>
        <span className={styles.textKey}>accuracy</span>
        <span className={styles.textValue}>{timelineLast.accuracy}%</span>
      </div>
      <div className={styles.testType}>
        <div>{testMode}</div>
        <div>{testType}</div>
      </div>

      {includeDate && result.date && (
        <div className={styles.date}>{getTimeSince(result.date, true)}</div>
      )}
    </button>
  );
}
