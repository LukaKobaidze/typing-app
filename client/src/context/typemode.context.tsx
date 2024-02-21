import { createContext } from 'react';
import { TypemodeTime, TypemodeType, TypemodeWords } from '@/data/types';
import { useLocalStorageState } from '@/hooks';
import { QuoteLengthType } from '@/types';

interface Context {
  mode: TypemodeType;
  time: TypemodeTime;
  words: TypemodeWords;
  quote: QuoteLengthType;
  punctuation: boolean;
  numbers: boolean;
  onMode: (mode: TypemodeType) => void;
  onTime: (time: TypemodeTime) => void;
  onWords: (amount: TypemodeWords) => void;
  onQuote: (length: QuoteLengthType) => void;
  onPunctuationToggle: () => void;
  onNumbersToggle: () => void;
}
const initial: Context = {
  mode: 'quote',
  time: 15,
  words: 10,
  quote: 'short',
  punctuation: false,
  numbers: false,
  onMode: () => {},
  onTime: () => {},
  onWords: () => {},
  onQuote: () => {},
  onPunctuationToggle: () => {},
  onNumbersToggle: () => {},
};

export const TypemodeContext = createContext(initial);

interface Props {
  children: React.ReactNode;
}

export const TypemodeContextProvider = ({ children }: Props) => {
  const [mode, setMode] = useLocalStorageState('typing-mode', initial.mode);
  const [quote, setquote] = useLocalStorageState('typing-quote', initial.quote);
  const [time, setTime] = useLocalStorageState('typing-time', initial.time);
  const [words, setwords] = useLocalStorageState('typing-words', initial.words);
  const [punctuation, setPunctuation] = useLocalStorageState(
    'punctuation',
    initial.punctuation
  );
  const [numbers, setNumbers] = useLocalStorageState('numbers', initial.numbers);

  const onMode: Context['onMode'] = (mode) => {
    setMode(mode);
  };
  const onTime: Context['onTime'] = (time) => {
    setTime(time);
  };
  const onWords: Context['onWords'] = (amount) => {
    setwords(amount);
  };
  const onQuote: Context['onQuote'] = (length) => {
    setquote(length);
  };

  const onPunctuationToggle: Context['onPunctuationToggle'] = () => {
    setPunctuation((state) => !state);
  };

  const onNumbersToggle: Context['onNumbersToggle'] = () => {
    setNumbers((state) => !state);
  };

  return (
    <TypemodeContext.Provider
      value={{
        mode,
        time,
        words,
        quote,
        punctuation,
        numbers,
        onMode,
        onTime,
        onWords,
        onQuote,
        onPunctuationToggle,
        onNumbersToggle,
      }}
    >
      {children}
    </TypemodeContext.Provider>
  );
};
