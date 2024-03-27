import { TypingResult } from '@/types';
import { TypingWords } from '../types';
import {
  type,
  nextWord,
  deleteKey,
  deleteWord,
  addWords,
  restart,
  timeline,
  result,
  newWords,
  start,
} from './actions';

export type TypingResultReducer = TypingResult & { showResult: boolean };

export type TypingState = {
  wordIndex: number;
  charIndex: number;
  words: TypingWords;
  mistype: number;
  typed: number;
  typedCorrectly: number;
  result: TypingResultReducer;
  dateTypingStarted: number | null;
};

export const initialState: TypingState = {
  words: [],
  wordIndex: 0,
  charIndex: 0,
  mistype: 0,
  typed: 0,
  typedCorrectly: 0,
  result: {
    showResult: false,
    timeline: [],
    errors: 0,
    testType: null,
  },
  dateTypingStarted: null,
};

export type TypingActions =
  | { type: 'START'; payload: string }
  | { type: 'TYPE'; payload: string }
  | { type: 'NEXT_WORD' }
  | { type: 'DELETE_KEY' }
  | { type: 'DELETE_WORD' }
  | { type: 'ADD_WORDS'; payload: TypingWords }
  | { type: 'RESTART'; payload?: TypingWords }
  | { type: 'TIMELINE' }
  | { type: 'RESULT'; payload?: number }
  | { type: 'NEW_WORDS'; payload: { words: TypingWords; author?: string } };

export default function typingReducer(
  state: TypingState,
  action: TypingActions
): TypingState {
  switch (action.type) {
    case 'START':
      return start(state, action.payload);
    case 'TYPE':
      return type(state, action.payload);
    case 'NEXT_WORD':
      return nextWord(state);
    case 'DELETE_KEY':
      return deleteKey(state);
    case 'DELETE_WORD':
      return deleteWord(state);
    case 'ADD_WORDS':
      return addWords(state, action.payload);
    case 'RESTART':
      return restart(state, action.payload);
    case 'TIMELINE':
      return timeline(state);
    case 'RESULT':
      return result(state, action.payload);
    case 'NEW_WORDS':
      return newWords(state, action.payload);
    default:
      return state;
  }
}
