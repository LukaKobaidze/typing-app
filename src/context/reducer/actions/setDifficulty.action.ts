import { TypingDifficulty, TypingState } from 'context/state-types';
import { getRandomWords, transformWordsArray } from '../functions';

const setDifficulty = (
  state: TypingState,
  difficulty: TypingDifficulty
): TypingState => {
  window.localStorage.setItem('difficulty', difficulty);
  const words = transformWordsArray(getRandomWords(difficulty));

  return {
    ...state,
    difficulty: difficulty,
    timerCountdown: state.initialTime,
    typingStarted: false,
    currentWord: 0,
    currentLetter: 0,
    words,
  };
};

export default setDifficulty;
