import { useContext, useEffect } from 'react';
import TypingContext from 'context/typing-context';
import { TypingWordsType } from 'context/state-types';
import { PercentCircleChart } from 'components/UI';
import 'styles/Typing/TypingResult.scss';

interface Props {
  typedWords: TypingWordsType;
  secondsTook: number;
}

const TypingResult = ({ typedWords, secondsTook }: Props) => {
  const { dispatch } = useContext(TypingContext);
  const { wordsCorrect, totalLetters, lettersCorrect } =
    getWordsData(typedWords);

  const calcWPM = wordsCorrect / (secondsTook / 60);
  const calcAccuracy = +((lettersCorrect / totalLetters) * 100).toFixed(2);

  useEffect(() => {
    dispatch({
      type: 'ADD_RESULT',
      payload: { wpm: calcWPM, accuracy: calcAccuracy },
    });
  }, [calcWPM, calcAccuracy, dispatch]);

  return (
    <div className="typing-result__wrapper">
      <div className="typing-result">
        <div className="typing-result__wpm">
          <p>Words per minute (WPM)</p>
          <p className="typing-result__number">{calcWPM}</p>
        </div>
        <div className="typing-result__accuracy">
          <p>Accuracy</p>
          <PercentCircleChart
            percentage={calcAccuracy}
            className="typing-result__percent-circle"
          />
        </div>
      </div>
    </div>
  );
};

export default TypingResult;

function getWordsData(words: TypingWordsType) {
  let totalWords = words.length;
  let wordsCorrect: number = 0;
  let totalLetters: number = 0;
  let lettersCorrect: number = 0;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    let isWordCorrect = true;
    for (let j = 0; j < word.length; j++) {
      const letter = word[j];

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
    }

    if (isWordCorrect) {
      wordsCorrect++;
    }
  }

  return {
    totalWords,
    wordsCorrect,
    totalLetters,
    lettersCorrect,
  };
}
