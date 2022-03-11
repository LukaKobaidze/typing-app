import { TypingState } from 'shared/types/typing.type';

const countdownDecrement = (state: TypingState): TypingState => {
  if (state.timerCountdown === 0) {
    return {
      ...state,
      typingStarted: false,
    };
  }

  return {
    ...state,
    timerCountdown: state.timerCountdown - 1,
  };
};

export default countdownDecrement;
