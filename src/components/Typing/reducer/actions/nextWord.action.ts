import { TypingDifficulty } from 'types/typing.type';
import { TypingState } from '../typing-reducer';
import { getRandomWords } from '../utils/words';

const nextWord = (
  state: TypingState,
  payload: TypingDifficulty
): TypingState => {
  if (state.timeCountdown === 0 || state.letterIndex === 0) {
    return state;
  }
  const words = state.words.slice(0);

  // If word is skipped and there are untyped letters left, count them as incorrect
  if (state.letterIndex < words[state.wordIndex].letters.length) {
    words[state.wordIndex].letters = words[state.wordIndex].letters.map(
      (letter) => {
        if (letter.type === 'none') {
          return {
            ...letter,
            type: 'incorrect',
          };
        }
        return letter;
      }
    );
  }

  const nextWordIndex = state.wordIndex + 1;
  const word = words[state.wordIndex];
  if (
    word.letters.some(
      (letter) => letter.type === 'extra' || letter.type === 'incorrect'
    )
  ) {
    word.isIncorrect = true;
  }
  if (nextWordIndex % 10 === 0) {
    // Add new words after every 10th word
    words.push(...getRandomWords(payload, 10));
  }

  return {
    ...state,
    wordIndex: nextWordIndex,
    letterIndex: 0,
    words,
  };
};

export default nextWord;
