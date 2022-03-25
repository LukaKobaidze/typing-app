import { TypingDifficulty, TypingState } from 'shared/types';
import { getRandomWords } from '../../utils';

const setDifficulty = (
  state: TypingState,
  difficulty: TypingDifficulty
): TypingState => {
  window.localStorage.setItem('difficulty', difficulty);
  const words = getRandomWords(difficulty);

  return {
    ...state,
    difficulty: difficulty,
    timerCountdown: state.initialTime,
    typingStarted: false,
    wordIndex: 0,
    letterIndex: 0,
    words,
  };
};

export default setDifficulty;
