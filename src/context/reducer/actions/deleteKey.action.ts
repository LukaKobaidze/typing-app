import { TypingState } from 'shared/types';

const deleteKey = (state: TypingState): TypingState => {
  if (state.timerCountdown === 0) {
    return state;
  }

  const words = state.words.slice(0);
  let currentWord = words[state.wordIndex];
  const currentLetter = currentWord[state.letterIndex - 1];

  if (currentLetter) {
    if (!currentLetter.extra) {
      currentLetter.type = 'none';
    } else {
      words[state.wordIndex] = currentWord.slice(0, -1);
    }
  }

  const stateCurrentLetter = currentLetter ? state.letterIndex - 1 : 0;

  return {
    ...state,
    wordIndex: state.wordIndex,
    letterIndex: stateCurrentLetter,
    words,
  };
};

export default deleteKey;
