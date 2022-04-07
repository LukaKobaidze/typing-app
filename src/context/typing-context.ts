import { createContext } from 'react';
import {
  TypingDifficulty,
  TypingPreviousResults,
  TypingState,
  TypingTime,
} from 'shared/types';
import { TypingActions } from './reducer/typing-reducer';
import { getRandomWords } from './utils';

const initialDifficulty = (): TypingDifficulty =>
  (window.localStorage.getItem('difficulty') as TypingDifficulty) || 'medium';

const initialTime = (): TypingTime =>
  (Number(window.localStorage.getItem('time')) as TypingTime) || 30;

const initialResults = (): TypingPreviousResults =>
  JSON.parse(window.localStorage.getItem('results')!) || {
    best: null,
    recent: [],
  };

export const initialTypingState: TypingState = {
  typingStarted: false,
  wordIndex: 0,
  letterIndex: 0,
  difficulty: initialDifficulty(),
  initialTime: initialTime(),
  timerCountdown: initialTime(),
  words: getRandomWords(initialDifficulty()),
  previousResults: initialResults(),
};

const TypingContext = createContext<{
  state: TypingState;
  dispatch: React.Dispatch<TypingActions>;
}>({ state: initialTypingState, dispatch: () => null });

export default TypingContext;
