import { TypingState } from 'shared/types';
import { getRandomWords } from 'context/utils/words';

const skipWord = (state: TypingState): TypingState => {
  if (state.timerCountdown === 0 || state.letterIndex === 0) {
    return state;
  }
  const words = state.words.slice(0);

  // If word is skipped and there are untyped letters left, count them as incorrect
  if (state.letterIndex < words[state.wordIndex].length) {
    words[state.wordIndex] = words[state.wordIndex].map((letter) => {
      if (letter.type === 'none') {
        return {
          ...letter,
          type: 'incorrect',
        };
      }
      return letter;
    });
  }

  const nextWordIndex = state.wordIndex + 1;

  // Add new words after every 10th word
  if (nextWordIndex % 10 === 0) {
    words.push(...getRandomWords(state.difficulty, 10));
  }

  return {
    ...state,
    typingStarted: true,
    wordIndex: nextWordIndex,
    letterIndex: 0,
    words,
  };
};

export default skipWord;
