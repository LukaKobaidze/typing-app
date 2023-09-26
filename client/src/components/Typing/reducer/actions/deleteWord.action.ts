import { TypingState } from '../typing.reducer';

export default function deleteWord(state: TypingState): TypingState {
  const words = state.words.slice(0);
  const currentWord = words[state.wordIndex];

  // Find index of first extra character
  const extraCharIndex = currentWord.chars.findIndex(
    (char) => char.type === 'extra'
  );

  // If there are extra characters, remove them
  if (extraCharIndex !== -1) {
    words[state.wordIndex].chars = currentWord.chars.slice(0, extraCharIndex);
  }

  const charIndex = Math.min(state.charIndex, currentWord.chars.length);

  let deletedWordCorrectChars = 0;

  for (let i = 0; i < charIndex; i++) {
    const char = currentWord.chars[i];
    if (char.type === 'correct') {
      deletedWordCorrectChars++;
    }

    char.type = 'none';
  }

  return {
    ...state,
    words,
    charIndex: 0,
    typedCorrectly: state.typedCorrectly - deletedWordCorrectChars,
  };
}
