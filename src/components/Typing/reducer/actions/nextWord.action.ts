import { TypingState } from '../typing-reducer';

const nextWord = (state: TypingState): TypingState => {
  if (state.letterIndex === 0) {
    return state;
  }
  const words = state.words.slice(0);
  let mistype = state.mistype;

  const word = words[state.wordIndex];
  if (
    word.letters.some(
      (letter) =>
        letter.type === 'extra' ||
        letter.type === 'incorrect' ||
        letter.type === 'none'
    )
  ) {
    word.isIncorrect = true;
    mistype++;
  }
  

  return {
    ...state,
    wordIndex: state.wordIndex + 1,
    letterIndex: 0,
    words,
    mistype,
  };
};

export default nextWord;
