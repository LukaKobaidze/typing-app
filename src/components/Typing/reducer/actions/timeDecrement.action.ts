import { TypingState } from '../typing-reducer';

const timeDecrement = (state: TypingState): TypingState => {
  if (state.timeCountdown === 0) return state;

  const typedWords = state.words.slice(0, state.wordIndex + 1);

  return {
    ...state,
    timeCountdown: state.timeCountdown - 1,
    wordsTimeline: [...state.wordsTimeline, typedWords],
  };
};

export default timeDecrement;
