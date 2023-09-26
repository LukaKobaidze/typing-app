import { TypingState } from '../typing.reducer';

export default function start(state: TypingState, testType: string): TypingState {
  return {
    ...state,
    dateTypingStarted: state.dateTypingStarted || new Date().getTime(),
    result: {
      ...state.result,
      testType,
    },
  };
}
