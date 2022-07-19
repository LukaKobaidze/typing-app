import { GlobalContext } from 'context';
import { useContext } from 'react';
import styles from 'styles/Typing/TypingCounter.module.scss';
import { TypingMode } from 'types/typing.type';

interface Props {
  mode: TypingMode;
  counter: number;
}

const TypingCounter = ({ mode, counter }: Props) => {
  const { wordsAmount } = useContext(GlobalContext);
  const calcSeconds = mode === 'time' && String(counter % 60).padStart(2, '0');

  return (
    <div className={styles.counter}>
      {mode === 'time' ? (
        <p>
          {+counter < 60
            ? calcSeconds
            : `${String(Math.floor(counter / 60)).padStart(
                2,
                '0'
              )}:${calcSeconds}`}
        </p>
      ) : (
        <p>
          {counter} / {wordsAmount}
        </p>
      )}
    </div>
  );
};

export default TypingCounter;
