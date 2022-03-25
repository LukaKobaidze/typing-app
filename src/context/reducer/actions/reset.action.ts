import { TypingState } from 'shared/types';
import { getRandomWords } from '../../utils';

const reset = (state: TypingState): TypingState => {
  const words = getRandomWords(state.difficulty);

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
