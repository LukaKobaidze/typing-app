import React, { createContext } from 'react';
import { TypingDifficulty, TypingState, TypingTime } from './state-types';
import { TypingActions } from './reducer/typing-reducer';
import { getRandomWords, transformWordsArray } from './reducer/functions';

const initialDifficulty = (): TypingDifficulty =>
  (window.localStorage.getItem('difficulty') as TypingDifficulty) || 'medium';

const initialTime = (): TypingTime =>
  (Number(window.localStorage.getItem('time')) as TypingTime) || 30;

export const initialTypingState = {
  typingStarted: false,
  currentWord: 0,
  currentLetter: 0,
  difficulty: initialDifficulty(),
  initialTime: initialTime(),
  timerCountdown: initialTime(),
  words: transformWordsArray(getRandomWords(initialDifficulty())),
};

const TypingContext = createContext<{
  state: TypingState;
  dispatch: React.Dispatch<TypingActions>;
}>({ state: initialTypingState, dispatch: () => null });

export default TypingContext;
