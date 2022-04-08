import { TypingState } from 'shared/types';

const timeDecrement = (state: TypingState): TypingState => {
  if (state.timerCountdown === 0) return state;

  const typedWords = state.words.slice(0, state.wordIndex + 1);

  return {
    ...state,
    timerCountdown: state.timerCountdown - 1,
    wordsTimeline: [...state.wordsTimeline, typedWords],
  };
};

export default timeDecrement;
