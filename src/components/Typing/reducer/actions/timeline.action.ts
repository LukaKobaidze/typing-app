import { getTypingResults } from 'helpers';
import { TypingState } from '../typing.reducer';

export default function timeline(state: TypingState): TypingState {
  if (!state.dateTypingStarted) return state;

  return {
    ...state,
    result: {
      ...state.result,
      timeline: [
        ...state.result.timeline,
        {
          second: state.result.timeline.length + 1,
          ...getTypingResults(
            state.typed,
            state.typedCorrectly,
            state.mistype,
            new Date().getTime() - state.dateTypingStarted
          ),
        },
      ],
    },
  };
}
