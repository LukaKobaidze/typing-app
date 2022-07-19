import { TypingState } from '../typing-reducer';

const result = (state: TypingState): TypingState => {
  // Calculate results
  if (!state.wordsTimeline[0]) {
    return state;
  }

  const timeline = state.wordsTimeline.map((words, index) => {
    let letters: number = 0;
    let lettersCorrect: number = 0;

    words.forEach((word) => {
      let isWordCorrect = true;
      word.letters.forEach((letter) => {
        const isLetterCorrect = letter.type === 'correct';
        if (letter.type !== 'none') {
          letters++;
        }
        if (isWordCorrect) {
          isWordCorrect = isLetterCorrect;
        }
        if (isLetterCorrect) {
          lettersCorrect++;
        }
      });
      if (isWordCorrect) {
        letters++;
        lettersCorrect++;
      }
    });

    return {
      second: index + 1,
      wpm: Math.round(lettersCorrect / 5 / ((index + 1) / 60)),
      accuracy: +((lettersCorrect / letters) * 100).toFixed(2),
    };
  });
  const { wpm, accuracy } = timeline[timeline.length - 1];

  return {
    ...state,
    result: {
      ...state.result,
      showResults: true,
      wpm,
      accuracy,
      timeline,
    },
  };
};

export default result;
