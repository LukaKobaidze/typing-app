import { getRandomWords } from 'lib/words';
import { TypingState } from '../typing-reducer';

const restart = (state: TypingState, wordsAmount?: number): TypingState => {
  const words = getRandomWords(wordsAmount);

  return {
    ...state,
    wordIndex: 0,
    letterIndex: 0,
    words,
    mistype: 0,
    wordsTimeline: [],
    result: {
      ...state.result,
      showResults: false,
      timeline: [],
    },
  };
};

export default restart;
