import {
  TypingDifficulty,
  TypingResult,
  TypingState,
  TypingTime,
} from 'shared/types';
import {
  reset,
  type,
  deleteKey,
  deleteWord,
  setTime,
  timeDecrement,
  setDifficulty,
  addResult,
} from './actions';

export type TypingActions =
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
      type: 'DELETE_WORD';
    }
  | {
      type: 'SET_TIME';
      payload: TypingTime;
    }
  | {
      type: 'TIME_DECREMENT';
    }
  | {
      type: 'SET_DIFFICULTY';
      payload: TypingDifficulty;
    }
  | {
      type: 'ADD_RESULT';
      payload: TypingResult;
    };

const typingReducer = (
  state: TypingState,
  action: TypingActions
): TypingState => {
  switch (action.type) {
    case 'RESET':
      return reset(state);
    case 'TYPE':
      return type(state, action.payload);
    case 'DELETE_KEY':
      return deleteKey(state);
    case 'DELETE_WORD':
      return deleteWord(state);
    case 'SET_TIME':
      return setTime(state, action.payload);
    case 'TIME_DECREMENT':
      return timeDecrement(state);
    case 'SET_DIFFICULTY':
      return setDifficulty(state, action.payload);
    case 'ADD_RESULT':
      return addResult(state, action.payload);
    default:
      return state;
  }
};

export default typingReducer;
