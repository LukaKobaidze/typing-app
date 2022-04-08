import { TypingResultType, TypingState } from 'shared/types';

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
      word.forEach((letter) => {
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
      wpm: +(lettersCorrect / 5 / ((index + 1) / 60)).toFixed(2),
      accuracy: +((lettersCorrect / letters) * 100).toFixed(2),
    };
  });
  const { wpm, accuracy } = timeline[timeline.length - 1];

  // Save result to previous results
  const recent = state.previousResults.recent.slice(0);
  let best: TypingResultType | null = { ...state.previousResults.best! };
  let isBest = false;

  if (recent.length === 3) {
    recent.pop();
  }
  recent.unshift({ wpm, accuracy });

  if (
    !best ||
    Object.keys(best).length === 0 ||
    best.wpm < wpm ||
    (best.wpm === wpm && best.accuracy < accuracy)
  ) {
    isBest = true;
    best = { wpm, accuracy };
  }

  const previousResults = {
    best,
    recent,
  };

  window.localStorage.setItem('results', JSON.stringify(previousResults));

  return {
    ...state,
    typingStarted: false,
    results: {
      ...state.results,
      showResults: true,
      wpm,
      accuracy,
      timeline,
      isBest,
    },
    previousResults,
  };
};

export default result;
