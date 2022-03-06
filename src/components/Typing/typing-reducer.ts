import { typeState } from './Typing';

type reducerActions = 'TYPE' | 'DELETE';

type typeAction = {
  type: reducerActions;
  payload?: string;
};

export const typeReducer = (state: typeState, action: typeAction) => {
  if (action.type === 'TYPE') {
    const sentence = state.sentence.slice(0);
    const currentWord = sentence[state.currentWord];
    const currentLetter = currentWord[state.currentLetter];

    if (state.currentLetter === currentWord.length) {
      if (action.payload === ' ') {
        return {
          currentWord: state.currentWord + 1,
          currentLetter: 0,
          sentence,
        };
      } else {
        sentence[state.currentWord] = [
          ...sentence[state.currentWord],
          {
            letter: action.payload!,
            state: 'incorrect',
            extra: true,
          },
        ];

        return {
          currentWord: state.currentWord,
          currentLetter: state.currentLetter + 1,
          sentence,
        };
      }
    }
    currentLetter.state =
      action.payload === currentLetter.letter ? 'correct' : 'incorrect';

    return {
      currentWord: state.currentWord,
      currentLetter: state.currentLetter + 1,
      sentence,
    };
  }

  if (action.type === 'DELETE') {
    const sentence = state.sentence.slice(0);
    let currentWord = sentence[state.currentWord];
    const currentLetter = currentWord[state.currentLetter - 1];

    if (currentLetter) {
      if (!currentLetter.extra) {
        currentLetter.state = 'none';
      } else {
        sentence[state.currentWord] = currentWord.slice(0, -1);
      }
    }

    const stateCurrentLetter = currentLetter ? state.currentLetter - 1 : 0;

    return {
      currentWord: state.currentWord,
      currentLetter: stateCurrentLetter,
      sentence,
    };
  }
  return state;
};
