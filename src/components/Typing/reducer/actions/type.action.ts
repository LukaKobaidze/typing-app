import { TypingState } from '../typing-reducer';

const type = (state: TypingState, key: string): TypingState => {
  const words = state.words.slice(0);
  const word = words[state.wordIndex];
  word.isIncorrect = false;
  const letter = words[state.wordIndex].letters[state.letterIndex];
  let mistype = state.mistype;

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
    mistype++;

    return {
      ...state,
      wordIndex: state.wordIndex,
      letterIndex: state.letterIndex + 1,
      words,
      mistype,
    };
  }

  // Check if typed key is correct
  if (key === letter.letter) {
    letter.type = 'correct';
  } else {
    letter.type = 'incorrect';
    mistype++;
  }

  return {
    ...state,
    wordIndex: state.wordIndex,
    letterIndex: state.letterIndex + 1,
    words,
    mistype,
  };
};

export default type;
