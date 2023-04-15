import { getTypingResults, twoDecimals } from 'helpers';
import { TypingState } from '../typing.reducer';

export default function result(state: TypingState, time?: number): TypingState {
  // Calculate results
  if (state.result.timeline.length === 0 || !state.dateTypingStarted) {
    return state;
  }

  const timeline = [...state.result.timeline];

  if (!time) {
    const timeTook = new Date().getTime() - state.dateTypingStarted;
    timeline.push({
      second: twoDecimals(timeTook / 1000),
      ...getTypingResults(
        state.typed,
        state.typedCorrectly,
        state.mistype,
        timeTook
      ),
    });
  }

  return {
    ...state,
    result: {
      ...state.result,
      showResults: true,
      timeline,
    },
  };
}
