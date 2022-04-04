import { useContext, useEffect } from 'react';
import { TypingContext } from 'context';
import { TypingWordsType } from 'shared/types';
import { PercentCircleChart } from 'components/UI';
import styles from 'styles/Typing/TypingResult.module.scss';

const getWordsData = (words: TypingWordsType) => {
  let totalLetters: number = 0;
  let lettersCorrect: number = 0;

  words.forEach((word) => {
    let isWordCorrect = true;
    word.forEach((letter) => {
      const isLetterCorrect = letter.type === 'correct';
      if (letter.type !== 'none') {
        totalLetters++;
      }
      if (isWordCorrect) {
        isWordCorrect = isLetterCorrect;
      }
      if (isLetterCorrect) {
        lettersCorrect++;
      }
    });
    if (isWordCorrect) {
      // Including spaces
      totalLetters++;
      lettersCorrect++;
    }
  });

  return {
    totalLetters,
    lettersCorrect,
  };
};

interface Props {
  typedWords: TypingWordsType;
  secondsTook: number;
}

const TypingResult = ({ typedWords, secondsTook }: Props) => {
  const { dispatch } = useContext(TypingContext);
  const { totalLetters, lettersCorrect } = getWordsData(typedWords);

  const calcWPM = lettersCorrect / 5 / (secondsTook / 60);
  const calcAccuracy = +((lettersCorrect / totalLetters) * 100).toFixed(2);

  useEffect(() => {
    dispatch({
      type: 'ADD_RESULT',
      payload: { wpm: calcWPM, accuracy: calcAccuracy },
    });
  }, [calcWPM, calcAccuracy, dispatch]);

  return (
    <div className={styles['result__wrapper']}>
      <div className={styles.result}>
        <div className={styles['result__wpm']}>
          <p>Words per minute (WPM)</p>
          <p className={styles['result__number']}>{calcWPM}</p>
        </div>
        <div className={styles['result__accuracy']}>
          <p>Accuracy</p>
          <PercentCircleChart
            percentage={calcAccuracy}
            className={styles['result__percent-circle']}
          />
        </div>
      </div>
    </div>
  );
};

export default TypingResult;
