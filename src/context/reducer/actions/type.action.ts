import { TypingState } from 'shared/types';

const type = (state: TypingState, key: string): TypingState => {
  if (state.timerCountdown === 0) {
    return state;
  }

  const words = state.words.slice(0);

  // Extra letters
  if (state.letterIndex === words[state.wordIndex].length) {
    // Find index of first extra letter
    const firstExtraIndex = words[state.wordIndex].findIndex(
      (letter) => letter.extra
    );

    // If there are 10 extra letters, do nothing
    if (words[state.wordIndex].length - firstExtraIndex === 10) {
      return state;
    }

    // Add extra letter
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

  // Check if typed key is correct
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
