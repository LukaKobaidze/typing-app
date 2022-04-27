import { TypingState } from '../typing-reducer';

const deleteKey = (state: TypingState): TypingState => {
  if (
    state.timeCountdown === 0 ||
    (state.wordIndex === 0 && state.letterIndex === 0)
  ) {
    return state;
  }

  if (state.letterIndex === 0) {
    const prevWordIndex = state.wordIndex - 1;

    return {
      ...state,
      wordIndex: prevWordIndex,
      letterIndex: state.words[prevWordIndex].length,
    };
  }

  const updatedWords = state.words.slice(0);
  const currentWord = updatedWords[state.wordIndex].slice(0);
  const prevLetter = currentWord[state.letterIndex - 1];

  if (prevLetter.type === 'extra') {
    currentWord.pop();
  } else {
    prevLetter.type = 'none';
  }

  updatedWords[state.wordIndex] = currentWord;

  return {
    ...state,
    letterIndex: state.letterIndex - 1,
    words: updatedWords,
  };
};

export default deleteKey;
