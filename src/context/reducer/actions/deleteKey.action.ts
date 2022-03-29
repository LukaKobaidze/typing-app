import { TypingState } from 'shared/types';

const deleteKey = (state: TypingState): TypingState => {
  if (state.timerCountdown === 0 || state.letterIndex === 0) {
    return state;
  }

  const updatedWords = state.words.slice(0);
  const currentWord = updatedWords[state.wordIndex].slice(0);
  const prevLetter = currentWord[state.letterIndex - 1];

  if (!prevLetter.extra) {
    prevLetter.type = 'none';
  } else {
    currentWord.pop();
  }

  updatedWords[state.wordIndex] = currentWord;

  return {
    ...state,
    letterIndex: state.letterIndex - 1,
    words: updatedWords,
  };
};

export default deleteKey;
