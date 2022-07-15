import { TypingState } from '../typing-reducer';

const type = (state: TypingState, key: string): TypingState => {
  if (state.timeCountdown === 0) {
    return state;
  }

  const words = state.words.slice(0);
  const word = words[state.wordIndex];
  word.isIncorrect = false;
  const letter = words[state.wordIndex].letters[state.letterIndex];

  // Extra letters
  if (state.letterIndex === word.letters.length) {
    // Find index of first extra letter
    const firstExtraIndex = word.letters.findIndex(
      (letter) => letter.type === 'extra'
    );

    // If there are 10 extra letters, do nothing (return state)
    if (word.letters.length - firstExtraIndex === 10) {
      return state;
    }

    // Add extra letter
    word.letters = [
      ...word.letters,
      {
        letter: key!,
        type: 'extra',
      },
    ];

    return {
      ...state,
      wordIndex: state.wordIndex,
      letterIndex: state.letterIndex + 1,
      words,
    };
  }

  // Check if typed key is correct
  letter.type = key === letter.letter ? 'correct' : 'incorrect';

  return {
    ...state,
    wordIndex: state.wordIndex,
    letterIndex: state.letterIndex + 1,
    words,
  };
};

export default type;
