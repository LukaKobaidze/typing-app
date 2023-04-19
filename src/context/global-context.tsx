import { createContext, useState } from 'react';
import { useStorageState } from 'hooks';
import {
  SettingsMode,
  SettingsQuote,
  SettingsTime,
  SettingsWords,
} from 'components/Settings';

interface Context {
  mode: SettingsMode;
  time: SettingsTime;
  wordsAmount: SettingsWords;
  quoteLength: SettingsQuote;
  typingStarted: boolean;
  onMode: (mode: SettingsMode) => void;
  onTime: (time: SettingsTime) => void;
  onWordsAmount: (amount: SettingsWords) => void;
  onQuoteLength: (length: SettingsQuote) => void;
  onTypingStart: () => void;
  onTypingEnd: () => void;
}
const initial: Context = {
  mode: 'quote',
  time: 15,
  wordsAmount: 10,
  quoteLength: 'short',
  typingStarted: false,
  onMode: () => {},
  onTime: () => {},
  onWordsAmount: () => {},
  onQuoteLength: () => {},
  onTypingStart: () => {},
  onTypingEnd: () => {},
};

const GlobalContext = createContext(initial);

interface Props {
  children: React.ReactNode;
}

const GlobalContextProvider = ({ children }: Props) => {
  const [mode, setMode] = useStorageState<SettingsMode>('typing-mode', initial.mode);
  const [quoteLength, setQuoteLength] = useStorageState<SettingsQuote>(
    'typing-quote',
    initial.quoteLength
  );
  const [time, setTime] = useStorageState<SettingsTime>('typing-time', initial.time);
  const [wordsAmount, setWordsAmount] = useStorageState<SettingsWords>(
    'typing-wordsAmount',
    initial.wordsAmount
  );
  const [typingStarted, setTypingStarted] = useState(initial.typingStarted);

  const onMode = (mode: SettingsMode) => setMode(mode);
  const onTime = (time: SettingsTime) => setTime(time);
  const onWordsAmount = (amount: SettingsWords) => setWordsAmount(amount);
  const onQuoteLength = (length: SettingsQuote) => setQuoteLength(length);
  const onTypingStart = () => setTypingStarted(true);
  const onTypingEnd = () => setTypingStarted(false);

  return (
    <GlobalContext.Provider
      value={{
        mode,
        time,
        wordsAmount,
        quoteLength,
        typingStarted,
        onMode,
        onTime,
        onWordsAmount,
        onQuoteLength,
        onTypingStart,
        onTypingEnd,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
