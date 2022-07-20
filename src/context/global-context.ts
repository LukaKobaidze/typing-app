import { createContext } from 'react';
import { TypingMode, TypingTime, TypingWordsAmount } from 'types/typing.type';

interface Context {
  mode: TypingMode;
  time: TypingTime;
  wordsAmount: TypingWordsAmount;
  typingStarted: boolean;
  onMode: (mode: TypingMode) => void;
  onTime: (time: TypingTime) => void;
  onWordsAmount: (amount: TypingWordsAmount) => void;
  onTypingStart: () => void;
  onTypingEnd: () => void;
}

const GlobalContext = createContext<Context>({
  mode: 'time',
  time: 15,
  wordsAmount: 25,
  typingStarted: false,
  onMode: () => {},
  onTime: () => {},
  onWordsAmount: () => {},
  onTypingStart: () => {},
  onTypingEnd: () => {},
});

export default GlobalContext;
