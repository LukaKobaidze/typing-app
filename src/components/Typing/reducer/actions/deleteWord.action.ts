import { TypingState } from '../typing-reducer';

const deleteWord = (state: TypingState): TypingState => {
  if (state.timeCountdown === 0) {
    return state;
  }

  const words = state.words.slice(0);
  const currentWord = words[state.wordIndex];

  // Find index of first extra letter
  const extraLetterIndex = currentWord.letters.findIndex(
    (letter) => letter.type === 'extra'
  );

  // If there are extra letters, remove them
  if (extraLetterIndex !== -1) {
    words[state.wordIndex].letters = currentWord.letters.slice(
      0,
      extraLetterIndex
    );
  }

  const letterIndex = Math.min(state.letterIndex, currentWord.letters.length);
  for (let i = 0; i < letterIndex; i++) {
    currentWord.letters[i].type = 'none';
  }

  return {
    ...state,
    words,
    letterIndex: 0,
  };
};

export default deleteWord;
