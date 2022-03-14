import { TypingState } from 'context/state-types';
import { getRandomWords, transformWordsArray } from '../functions';

const type = (state: TypingState, key: string): TypingState => {
  if (state.timerCountdown === 0) {
    return state;
  }

  const words = state.words.slice(0);
  const currentWord = words[state.currentWord];
  const currentLetter = currentWord[state.currentLetter];

  if (state.currentLetter === currentWord.length) {
    if (key === ' ') {
      const nextWord = state.currentWord + 1;

      if (nextWord % 10 === 0) {
        words.push(
          ...transformWordsArray(getRandomWords(state.difficulty, 10))
        );
      }

      return {
        ...state,
        typingStarted: true,
        currentWord: nextWord,
        currentLetter: 0,
        words,
      };
    } else {
      words[state.currentWord] = [
        ...words[state.currentWord],
        {
          letter: key!,
          type: 'incorrect',
          extra: true,
        },
      ];

      return {
        ...state,
        typingStarted: true,
        currentWord: state.currentWord,
        currentLetter: state.currentLetter + 1,
        words,
      };
    }
  }
  currentLetter.type = key === currentLetter.letter ? 'correct' : 'incorrect';

  return {
    ...state,
    typingStarted: true,
    currentWord: state.currentWord,
    currentLetter: state.currentLetter + 1,
    words,
  };
};

export default type;
