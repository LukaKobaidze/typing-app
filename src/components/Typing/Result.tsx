import { TypingWordsType } from 'context/state-types';
import { PercentCircleChart } from 'components/UI';
import 'styles/Typing/Result.scss';

const getWordsData = (words: TypingWordsType) => {
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
};

interface Props {
  typedWords: TypingWordsType;
  secondsTook: number;
}

const Result = ({ typedWords, secondsTook }: Props) => {
  const { wordsCorrect, totalLetters, lettersCorrect } =
    getWordsData(typedWords);

  const calcWPM = wordsCorrect / (secondsTook / 60);
  const calcAccuracy = +((lettersCorrect / totalLetters) * 100).toFixed(2);

  return (
    <div className="result">
      <div className="result__wpm">
        <p>Words per minute (WPM)</p>
        <p className="result__number">{calcWPM}</p>
      </div>
      <div className="result__accuracy">
        <p>Accuracy</p>
        <PercentCircleChart
          percentage={calcAccuracy}
          className="result__number"
        />
      </div>
    </div>
  );
};

export default Result;
