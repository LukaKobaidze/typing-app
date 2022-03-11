import {
  TypingDifficulty,
  TypingState,
  TypingTime,
} from 'shared/types/typing.type';
import {
  reset,
  type,
  deleteKey,
  countdownDecrement,
  setTimer,
  setDifficulty,
} from './actions';

type Action =
  | {
      type: 'RESET';
    }
  | {
      type: 'TYPE';
      payload: string;
    }
  | {
      type: 'DELETE_KEY';
    }
  | {
      type: 'COUNTDOWN_DECREMENT';
    }
  | {
      type: 'SET_TIMER';
      payload: TypingTime;
    }
  | {
      type: 'SET_DIFFICULTY';
      payload: TypingDifficulty;
    };

const typingReducer = (state: TypingState, action: Action): TypingState => {
  switch (action.type) {
    case 'RESET':
      return reset(state);
    case 'TYPE':
      return type(state, action.payload);
    case 'DELETE_KEY':
      return deleteKey(state);
    case 'COUNTDOWN_DECREMENT':
      return countdownDecrement(state);
    case 'SET_TIMER':
      return setTimer(state, action.payload);
    case 'SET_DIFFICULTY':
      return setDifficulty(state, action.payload);
    default:
      return state;
  }
};

export default typingReducer;
