import { createContext, useState } from 'react';
import {
  TypingMode,
  TypingTime,
  TypingWordsAmount,
} from 'components/Typing/types';
import { useStorageState } from 'hooks';

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

interface Props {
  children: React.ReactNode;
}

const GlobalContextProvider = ({ children }: Props) => {
  const [mode, setMode] = useStorageState<TypingMode>('typing-mode', 'words');
  const [time, setTime] = useStorageState<TypingTime>('typing-time', 30);
  const [wordsAmount, setWordsAmount] = useStorageState<TypingWordsAmount>(
    'typing-wordsAmount',
    25
  );
  const [typingStarted, setTypingStarted] = useState(false);

  const onMode = (mode: TypingMode) => setMode(mode);
  const onTime = (time: TypingTime) => setTime(time);
  const onWordsAmount = (amount: TypingWordsAmount) => setWordsAmount(amount);
  const onTypingStart = () => setTypingStarted(true);
  const onTypingEnd = () => setTypingStarted(false);

  return (
    <GlobalContext.Provider
      value={{
        mode,
        time,
        wordsAmount,
        typingStarted,
        onMode,
        onTime,
        onWordsAmount,
        onTypingStart,
        onTypingEnd,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
