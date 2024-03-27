import { createContext, useEffect, useState } from 'react';
import { TypingResult } from '@/types';
import { ResultOptions } from '@/components/Typing/Result';

interface Context {
  typingStarted: boolean;
  typingFocused: boolean;
  typingDisabled: boolean;
  resultPreview: { state: TypingResult; options?: ResultOptions } | null;
  lineHeight: number;
  setLineHeight: React.Dispatch<React.SetStateAction<number>>;
  typemodeVisible: boolean;
  setTypemodeVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onTypingStarted: () => void;
  onTypingEnded: () => void;
  onTypingDisable: () => void;
  onTypingAllow: () => void;
  onPreviewResult: (result: TypingResult | null, options?: ResultOptions) => void;
  onUpdateTypingFocus: (bool: boolean) => void;
}
const initial: Context = {
  typingStarted: false,
  typingFocused: false,
  typingDisabled: false,
  resultPreview: null,
  lineHeight: 0,
  typemodeVisible: true,
  setTypemodeVisible: () => {},
  setLineHeight: () => {},
  onTypingStarted: () => {},
  onTypingEnded: () => {},
  onTypingDisable: () => {},
  onTypingAllow: () => {},
  onPreviewResult: () => {},
  onUpdateTypingFocus: () => {},
};

const TypingContext = createContext(initial);

interface Props {
  children: React.ReactNode;
}

const TypingContextProvider = ({ children }: Props) => {
  const [typingStarted, setTypingStarted] = useState(initial.typingStarted);
  const [typingFocused, setTypingFocused] = useState(initial.typingFocused);
  const [typingDisabled, setTypingDisabled] = useState(initial.typingDisabled);
  const [resultPreview, setResultPreview] = useState(initial.resultPreview);
  const [lineHeight, setLineHeight] = useState(initial.lineHeight);
  const [typemodeVisible, setTypemodeVisible] = useState(initial.typemodeVisible);

  const onTypingStarted = () => setTypingStarted(true);
  const onTypingEnded = () => setTypingStarted(false);

  const onTypingDisable = () => setTypingDisabled(true);
  const onTypingAllow = () => setTypingDisabled(false);

  const onPreviewResult: Context['onPreviewResult'] = (result, options) => {
    setResultPreview(result ? { state: result, options } : null);
  };

  const onUpdateTypingFocus: Context['onUpdateTypingFocus'] = (bool) => {
    setTypingFocused(bool);
  };

  useEffect(() => {
    if (typingFocused) {
      document.documentElement.style.cursor = 'none';
    } else {
      document.documentElement.style.cursor = 'auto';
    }
  }, [typingFocused]);

  useEffect(() => {
    if (resultPreview === null) {
      setTypemodeVisible(true);
    } else {
      setTypemodeVisible(false);
    }
  }, [resultPreview]);

  return (
    <TypingContext.Provider
      value={{
        typingStarted,
        typingFocused,
        typingDisabled,
        resultPreview,
        lineHeight,
        typemodeVisible,
        setTypemodeVisible,
        onTypingStarted,
        onTypingEnded,
        onTypingDisable,
        onTypingAllow,
        onPreviewResult,
        onUpdateTypingFocus,
        setLineHeight,
      }}
    >
      {children}
    </TypingContext.Provider>
  );
};

export { TypingContext, TypingContextProvider };
