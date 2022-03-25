import { TypingState } from 'shared/types';

const deleteWord = (state: TypingState): TypingState => {
  const words = state.words.slice();
  let currentWord = words[state.wordIndex];

  const extraLetterIndex = currentWord.findIndex((letter) => letter.extra);
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
