import { TypingState } from '../typing-reducer';

const deleteWord = (state: TypingState): TypingState => {
  if (state.timeCountdown === 0) {
    return state;
  }

  const words = state.words.slice(0);
  const currentWord = words[state.wordIndex].slice(0);

  // Find index of first extra letter
  const extraLetterIndex = currentWord.findIndex(
    (letter) => letter.type === 'extra'
  );

  // If there are extra letters, remove them
  if (extraLetterIndex !== -1) {
    words[state.wordIndex] = currentWord.slice(0, extraLetterIndex);
  }

  const letterIndex = Math.min(state.letterIndex, currentWord.length);
  for (let i = 0; i < letterIndex; i++) {
    currentWord[i].type = 'none';
  }

  return {
    ...state,
    words,
    letterIndex: 0,
  };
};

export default deleteWord;
