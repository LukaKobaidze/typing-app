import { createContext } from 'react';
import {
  TypemodeQuote,
  TypemodeTime,
  TypemodeType,
  TypemodeWords,
} from '@/data/types';
import { useLocalStorageState } from '@/hooks';

interface Context {
  mode: TypemodeType;
  time: TypemodeTime;
  wordsAmount: TypemodeWords;
  quoteLength: TypemodeQuote;
  onMode: (mode: TypemodeType) => void;
  onTime: (time: TypemodeTime) => void;
  onWordsAmount: (amount: TypemodeWords) => void;
  onQuoteLength: (length: TypemodeQuote) => void;
}
const initial: Context = {
  mode: 'quote',
  time: 15,
  wordsAmount: 10,
  quoteLength: 'short',
  onMode: () => {},
  onTime: () => {},
  onWordsAmount: () => {},
  onQuoteLength: () => {},
};

export const TypemodeContext = createContext(initial);

interface Props {
  children: React.ReactNode;
}

export const TypemodeContextProvider = ({ children }: Props) => {
  const [mode, setMode] = useLocalStorageState('typing-mode', initial.mode);
  const [quoteLength, setQuoteLength] = useLocalStorageState(
    'typing-quote',
    initial.quoteLength
  );
  const [time, setTime] = useLocalStorageState('typing-time', initial.time);
  const [wordsAmount, setWordsAmount] = useLocalStorageState(
    'typing-wordsAmount',
    initial.wordsAmount
  );

  const onMode: Context['onMode'] = (mode) => {
    setMode(mode);
  };
  const onTime: Context['onTime'] = (time) => {
    setTime(time);
  };
  const onWordsAmount: Context['onWordsAmount'] = (amount) => {
    setWordsAmount(amount);
  };
  const onQuoteLength: Context['onQuoteLength'] = (length) => {
    setQuoteLength(length);
  };

  return (
    <TypemodeContext.Provider
      value={{
        mode,
        time,
        wordsAmount,
        quoteLength,
        onMode,
        onTime,
        onWordsAmount,
        onQuoteLength,
      }}
    >
      {children}
    </TypemodeContext.Provider>
  );
};
