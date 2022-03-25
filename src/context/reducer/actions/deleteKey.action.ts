import { TypingState } from 'shared/types';

const deleteKey = (state: TypingState): TypingState => {
  if (state.timerCountdown === 0) {
    return state;
  }

  const words = state.words.slice(0);
  let currentWord = words[state.wordIndex];
  const prevLetter = currentWord[state.letterIndex - 1];

  let stateCurrentLetter = state.letterIndex;
  if (prevLetter) {
    if (!prevLetter.extra) {
      prevLetter.type = 'none';
    } else {
      words[state.wordIndex] = currentWord.slice(0, -1);
    }
    stateCurrentLetter -= 1;
  }

  return {
    ...state,
    wordIndex: state.wordIndex,
    letterIndex: stateCurrentLetter,
    words,
  };
};

export default deleteKey;
