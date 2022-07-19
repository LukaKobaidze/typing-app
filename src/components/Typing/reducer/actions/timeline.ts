import { TypingState } from '../typing-reducer';

const timeline = (state: TypingState): TypingState => {
  return {
    ...state,
    wordsTimeline: [
      ...state.wordsTimeline,
      state.words.slice(0, state.wordIndex + 1),
    ],
  };
};

export default timeline;
