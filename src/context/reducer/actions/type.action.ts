import { TypingState } from 'context/state-types';
import { getRandomWords, transformWordsArray } from '../functions';

const type = (state: TypingState, key: string): TypingState => {
  if (state.timerCountdown === 0) {
    return state;
  }

  const words = state.words.slice(0);
  const currentWord = words[state.wordIndex];
  const currentLetter = currentWord[state.letterIndex];

  if (key === ' ') {
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

  if (state.letterIndex === currentWord.length) {
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
  currentLetter.type = key === currentLetter.letter ? 'correct' : 'incorrect';

  return {
    ...state,
    typingStarted: true,
    wordIndex: state.wordIndex,
    letterIndex: state.letterIndex + 1,
    words,
  };
};

export default type;
