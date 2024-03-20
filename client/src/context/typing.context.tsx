import { TypingResult } from '@/types';
import { createContext, useEffect, useState } from 'react';

interface Context {
  typingStarted: boolean;
  typingFocused: boolean;
  typingDisabled: boolean;
  resultPreview: TypingResult | null;
  lineHeight: number;
  setLineHeight: React.Dispatch<React.SetStateAction<number>>;
  onTypingStarted: () => void;
  onTypingEnded: () => void;
  onTypingDisable: () => void;
  onTypingAllow: () => void;
  onPreviewResult: (result: TypingResult | null) => void;
  onUpdateTypingFocus: (bool: boolean) => void;
}
const initial: Context = {
  typingStarted: false,
  typingFocused: false,
  typingDisabled: false,
  resultPreview: null,
  lineHeight: 0,
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

  const onTypingStarted = () => setTypingStarted(true);
  const onTypingEnded = () => setTypingStarted(false);

  const onTypingDisable = () => setTypingDisabled(true);
  const onTypingAllow = () => setTypingDisabled(false);

  const onPreviewResult: Context['onPreviewResult'] = (result) => {
    setResultPreview(result);
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

  return (
    <TypingContext.Provider
      value={{
        typingStarted,
        typingFocused,
        typingDisabled,
        resultPreview,
        lineHeight,
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
