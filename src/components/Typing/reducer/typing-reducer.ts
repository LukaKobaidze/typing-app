import { TypingResult, TypingTime, TypingWords } from 'types/typing.type';
import {
  type,
  nextWord,
  deleteKey,
  deleteWord,
  restart,
  result,
  addWords,
} from './actions';
import timeline from './actions/timeline';

import { getRandomWords } from './utils/words';

const initialTime = (): TypingTime =>
  (Number(window.localStorage.getItem('time')) as TypingTime) || 30;

export type TypingState = {
  wordIndex: number;
  letterIndex: number;
  words: TypingWords;
  mistype: number;
  wordsTimeline: TypingWords[];
  result: TypingResult;
};

export const initialState: TypingState = {
  wordIndex: 0,
  letterIndex: 0,
  words: getRandomWords(),
  mistype: 0,
  wordsTimeline: [],
  result: {
    showResults: false,
    wpm: 0,
    accuracy: 0,
    timeline: [],
    time: initialTime(),
  },
};

export type TypingActions =
  | { type: 'TYPE'; payload: string }
  | { type: 'NEXT_WORD' }
  | { type: 'DELETE_KEY' }
  | { type: 'DELETE_WORD' }
  | { type: 'ADD_WORDS'; payload: number }
  | { type: 'RESTART'; payload?: number }
  | { type: 'TIMELINE' }
  | { type: 'RESULT' };

const typingReducer = (
  state: TypingState,
  action: TypingActions
): TypingState => {
  switch (action.type) {
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
      return !action.payload ? restart(state) : restart(state, action.payload);
    case 'TIMELINE':
      return timeline(state);
    case 'RESULT':
      return result(state);
    default:
      return state;
  }
};

export default typingReducer;
