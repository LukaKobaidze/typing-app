import { TypingState } from 'context/state-types';

const deleteKey = (state: TypingState): TypingState => {
  if (state.timerCountdown === 0) {
    return state;
  }

  const words = state.words.slice(0);
  let currentWord = words[state.currentWord];
  const currentLetter = currentWord[state.currentLetter - 1];

  if (currentLetter) {
    if (!currentLetter.extra) {
      currentLetter.type = 'none';
    } else {
      words[state.currentWord] = currentWord.slice(0, -1);
    }
  }

  const stateCurrentLetter = currentLetter ? state.currentLetter - 1 : 0;

  return {
    ...state,
    currentWord: state.currentWord,
    currentLetter: stateCurrentLetter,
    words,
  };
};

export default deleteKey;
