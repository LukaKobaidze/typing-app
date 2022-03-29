import { TypingState } from 'shared/types';

const deleteWord = (state: TypingState): TypingState => {
  if (state.timerCountdown === 0) {
    return state;
  }

  const words = state.words.slice(0);

  // Find index of first extra letter
  const extraLetterIndex = words[state.wordIndex].findIndex(
    (letter) => letter.extra
  );

  // If there are extra letters, remove them
  if (extraLetterIndex !== -1) {
    words[state.wordIndex] = words[state.wordIndex].slice(0, extraLetterIndex);
  }

  const letterIndex = Math.min(
    state.letterIndex,
    words[state.wordIndex].length
  );
  for (let i = 0; i < letterIndex; i++) {
    words[state.wordIndex][i].type = 'none';
  }

  return {
    ...state,
    words,
    letterIndex: 0,
  };
};

export default deleteWord;
