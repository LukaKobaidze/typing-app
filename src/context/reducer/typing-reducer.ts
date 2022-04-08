import { TypingDifficulty, TypingState, TypingTime } from 'shared/types';
import {
  type,
  skipWord,
  deleteKey,
  deleteWord,
  restart,
  setDifficulty,
  setTime,
  timeDecrement,
  result,
} from './actions';

export type TypingActions =
  | { type: 'TYPE'; payload: string }
  | { type: 'SKIP_WORD' }
  | { type: 'DELETE_KEY' }
  | { type: 'DELETE_WORD' }
  | { type: 'RESTART' }
  | { type: 'SET_DIFFICULTY'; payload: TypingDifficulty }
  | { type: 'SET_TIME'; payload: TypingTime }
  | { type: 'TIME_DECREMENT' }
  | { type: 'RESULT' };

const typingReducer = (
  state: TypingState,
  action: TypingActions
): TypingState => {
  switch (action.type) {
    case 'TYPE':
      return type(state, action.payload);
    case 'SKIP_WORD':
      return skipWord(state);
    case 'DELETE_KEY':
      return deleteKey(state);
    case 'DELETE_WORD':
      return deleteWord(state);
    case 'RESTART':
      return restart(state);
    case 'SET_DIFFICULTY':
      return setDifficulty(state, action.payload);
    case 'SET_TIME':
      return setTime(state, action.payload);
    case 'TIME_DECREMENT':
      return timeDecrement(state);
    case 'RESULT':
      return result(state);
    default:
      return state;
  }
};

export default typingReducer;
