import { TypingState } from 'context/state-types';
import { getRandomWords, transformWordsArray } from '../functions';

const reset = (state: TypingState): TypingState => {
  const words = transformWordsArray(getRandomWords(state.difficulty));

  return {
    ...state,
    timerCountdown: state.initialTime,
    typingStarted: false,
    wordIndex: 0,
    letterIndex: 0,
    words,
  };
};

export default reset;
