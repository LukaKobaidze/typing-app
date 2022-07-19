import { useState } from 'react';
import { useStorageState } from 'hooks';
import { TypingMode, TypingTime, TypingWordsAmount } from 'types/typing.type';
import GlobalContext from './global-context';

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

  const onMode = (mode: TypingMode) => {
    setMode(mode);
  };
  const onTime = (time: TypingTime) => {
    setTime(time);
  };
  const onWordsAmount = (amount: TypingWordsAmount) => {
    setWordsAmount(amount);
  };

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

export default GlobalContextProvider;
