import { TypingState } from '../typing.reducer';

export default function nextWord(state: TypingState): TypingState {
  if (state.charIndex === 0 || state.result.showResult) {
    return state;
  }
  const words = state.words.slice(0);
  let mistype = state.mistype;

  const word = words[state.wordIndex];

  let prevWordCorrectChars = 0;
  for (let i = 0; i < word.chars.length; i++) {
    const char = word.chars[i];
    if (char.type !== 'correct') {
      word.isIncorrect = true;
    } else {
      prevWordCorrectChars++;
    }
  }

  return {
    ...state,
    wordIndex: state.wordIndex + 1,
    charIndex: 0,
    words,
    mistype,
    typed: state.typed + 1,
    typedCorrectly: word.isIncorrect
      ? state.typedCorrectly - prevWordCorrectChars
      : state.typedCorrectly + 1,
    result: {
      ...state.result,
      errors: word.isIncorrect ? state.result.errors + 1 : state.result.errors,
    },
  };
}
