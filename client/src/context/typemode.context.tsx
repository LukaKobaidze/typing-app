import { createContext, useEffect, useState } from 'react';
import { getQuoteTagList } from '@/services/quotable';
import { QuoteLengthType } from '@/types';
import { useLocalStorageState } from '@/hooks';
import { TypemodeTime, TypemodeType, TypemodeWords } from '@/data/types';

type QuoteTagsType = { name: string; isSelected: boolean }[];
type QuoteTagsModeType = 'all' | 'only selected';

interface Context {
  mode: TypemodeType;
  time: TypemodeTime;
  words: TypemodeWords;
  quote: QuoteLengthType;
  punctuation: boolean;
  numbers: boolean;
  quoteTagsMode: QuoteTagsModeType;
  quoteTags: QuoteTagsType;
  onMode: (mode: TypemodeType) => void;
  onTime: (time: TypemodeTime) => void;
  onWords: (amount: TypemodeWords) => void;
  onQuote: (length: QuoteLengthType) => void;
  onPunctuationToggle: () => void;
  onNumbersToggle: () => void;
  onToggleQuoteTag: (index: number) => void;
  onUpdateQuoteTagsMode: (mode: QuoteTagsModeType) => void;
  onClearSelectedQuoteTags: () => void;
}
const initial: Context = {
  mode: 'quote',
  time: 15,
  words: 10,
  quote: 'short',
  punctuation: false,
  numbers: false,
  quoteTagsMode: 'all',
  quoteTags: [],
  onMode: () => {},
  onTime: () => {},
  onWords: () => {},
  onQuote: () => {},
  onPunctuationToggle: () => {},
  onNumbersToggle: () => {},
  onToggleQuoteTag: () => {},
  onUpdateQuoteTagsMode: () => {},
  onClearSelectedQuoteTags: () => {},
};

export const TypemodeContext = createContext(initial);

interface Props {
  children: React.ReactNode;
}

export const TypemodeContextProvider = ({ children }: Props) => {
  const [mode, setMode] = useLocalStorageState('typing-mode', initial.mode);
  const [quote, setQuote] = useLocalStorageState('typing-quote', initial.quote);
  const [time, setTime] = useLocalStorageState('typing-time', initial.time);
  const [words, setwords] = useLocalStorageState('typing-words', initial.words);
  const [punctuation, setPunctuation] = useLocalStorageState(
    'punctuation',
    initial.punctuation
  );
  const [numbers, setNumbers] = useLocalStorageState('numbers', initial.numbers);
  const [quoteTags, setQuoteTags] = useState(initial.quoteTags);
  const [quoteTagsMode, setquoteTagsMode] = useState(initial.quoteTagsMode);

  useEffect(() => {
    getQuoteTagList().then((data) => {
      const quoteTagsData: QuoteTagsType = data.map((tag: any) => ({
        name: tag.name,
        isSelected: false,
      }));

      setQuoteTags(quoteTagsData);
    });
  }, []);

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
    setQuote(length);
  };

  const onPunctuationToggle: Context['onPunctuationToggle'] = () => {
    setPunctuation((state) => !state);
  };

  const onNumbersToggle: Context['onNumbersToggle'] = () => {
    setNumbers((state) => !state);
  };

  const onToggleQuoteTag: Context['onToggleQuoteTag'] = (tagIndex) => {
    setQuoteTags((state) => [
      ...state.slice(0, tagIndex),
      {
        name: state[tagIndex].name,
        isSelected: !state[tagIndex].isSelected,
      },
      ...state.slice(tagIndex + 1),
    ]);
  };

  const onUpdateQuoteTagsMode: Context['onUpdateQuoteTagsMode'] = (mode) => {
    setquoteTagsMode(mode);
  };

  const onClearSelectedQuoteTags: Context['onClearSelectedQuoteTags'] = () => {
    setQuoteTags((state) =>
      state.map((quoteTag) => ({ ...quoteTag, isSelected: false }))
    );
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
        quoteTagsMode,
        quoteTags,
        onMode,
        onTime,
        onWords,
        onQuote,
        onPunctuationToggle,
        onNumbersToggle,
        onToggleQuoteTag,
        onUpdateQuoteTagsMode,
        onClearSelectedQuoteTags,
      }}
    >
      {children}
    </TypemodeContext.Provider>
  );
};
