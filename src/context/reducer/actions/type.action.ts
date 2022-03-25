import { TypingState } from 'shared/types';
import { getRandomWords, transformWordsArray } from '../functions';

const type = (state: TypingState, key: string): TypingState => {
  if (state.timerCountdown === 0) {
    return state;
  }

  const words = state.words.slice(0);

  if (key === ' ') {
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

    if (state.letterIndex === 0) {
      return state;
    }

    const nextWordIndex = state.wordIndex + 1;

    if (nextWordIndex % 10 === 0) {
      words.push(...transformWordsArray(getRandomWords(state.difficulty, 10)));
    }

    return {
      ...state,
      typingStarted: true,
      wordIndex: nextWordIndex,
      letterIndex: 0,
      words,
    };
  }

  if (state.letterIndex === words[state.wordIndex].length) {
    const firstExtraIndex = words[state.wordIndex].findIndex(
      (letter) => letter.extra
    );

    if (words[state.wordIndex].length - firstExtraIndex + 1 > 9) {
      return state;
    }

    words[state.wordIndex] = [
      ...words[state.wordIndex],
      {
        letter: key!,
        type: 'incorrect',
        extra: true,
      },
    ];

    return {
      ...state,
      typingStarted: true,
      wordIndex: state.wordIndex,
      letterIndex: state.letterIndex + 1,
      words,
    };
  }
  words[state.wordIndex][state.letterIndex].type =
    key === words[state.wordIndex][state.letterIndex].letter
      ? 'correct'
      : 'incorrect';

  return {
    ...state,
    typingStarted: true,
    wordIndex: state.wordIndex,
    letterIndex: state.letterIndex + 1,
    words,
  };
};

export default type;
