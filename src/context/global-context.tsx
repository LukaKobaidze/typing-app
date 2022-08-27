import { createContext, useState } from 'react';
import { useStorageState } from 'hooks';
import { SettingsMode, SettingsTime, SettingsWords } from 'components/Settings';

interface Context {
  mode: SettingsMode;
  time: SettingsTime;
  wordsAmount: SettingsWords;
  typingStarted: boolean;
  onMode: (mode: SettingsMode) => void;
  onTime: (time: SettingsTime) => void;
  onWordsAmount: (amount: SettingsWords) => void;
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
  const [mode, setMode] = useStorageState<SettingsMode>('typing-mode', 'words');
  const [time, setTime] = useStorageState<SettingsTime>('typing-time', 30);
  const [wordsAmount, setWordsAmount] = useStorageState<SettingsWords>(
    'typing-wordsAmount',
    25
  );
  const [typingStarted, setTypingStarted] = useState(false);

  const onMode = (mode: SettingsMode) => setMode(mode);
  const onTime = (time: SettingsTime) => setTime(time);
  const onWordsAmount = (amount: SettingsWords) => setWordsAmount(amount);
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
