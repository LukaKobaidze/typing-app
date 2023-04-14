import { TypingState } from '../typing.reducer';

export default function start(state: TypingState): TypingState {
  return {
    ...state,
    dateTypingStarted: state.dateTypingStarted || new Date().getTime(),
  };
}
