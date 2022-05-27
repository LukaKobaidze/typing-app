import {
  TypingDifficulty,
  TypingResult,
  TypingSettings,
  TypingTime,
  TypingWords,
} from 'types/typing.type';
import {
  type,
  nextWord,
  deleteKey,
  deleteWord,
  restart,
  timeDecrement,
  result,
} from './actions';

import { getRandomWords } from './utils/words';

const initialDifficulty = (): TypingDifficulty =>
  (window.localStorage.getItem('difficulty') as TypingDifficulty) || 'medium';

const initialTime = (): TypingTime =>
  (Number(window.localStorage.getItem('time')) as TypingTime) || 30;

export type TypingState = {
  typingStarted: boolean;
  wordIndex: number;
  letterIndex: number;
  words: TypingWords;
  timeCountdown: number;
  wordsTimeline: TypingWords[];
  result: TypingResult;
};

export const initialState: TypingState = {
  typingStarted: false,
  wordIndex: 0,
  letterIndex: 0,
  timeCountdown: initialTime(),
  words: getRandomWords(initialDifficulty()),
  wordsTimeline: [],
  result: {
    showResults: false,
    wpm: 0,
    accuracy: 0,
    timeline: [],
    time: initialTime(),
    difficulty: initialDifficulty(),
  },
};

export type TypingActions =
  | { type: 'TYPE'; payload: string }
  | { type: 'NEXT_WORD'; payload: TypingDifficulty }
  | { type: 'DELETE_KEY' }
  | { type: 'DELETE_WORD' }
  | { type: 'RESTART'; payload: TypingSettings }
  | { type: 'TIME_DECREMENT' }
  | { type: 'RESULT' };

const typingReducer = (
  state: TypingState,
  action: TypingActions
): TypingState => {
  switch (action.type) {
    case 'TYPE':
      return type(state, action.payload);
    case 'NEXT_WORD':
      return nextWord(state, action.payload);
    case 'DELETE_KEY':
      return deleteKey(state);
    case 'DELETE_WORD':
      return deleteWord(state);
    case 'RESTART':
      return restart(state, action.payload);
    case 'TIME_DECREMENT':
      return timeDecrement(state);
    case 'RESULT':
      return result(state);
    default:
      return state;
  }
};

export default typingReducer;
