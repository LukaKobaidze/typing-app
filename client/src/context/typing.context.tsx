import { createContext, useState } from 'react';

interface Context {
  typingStarted: boolean;
  typingDisabled: boolean;
  onTypingStarted: () => void;
  onTypingEnded: () => void;
  onTypingDisable: () => void;
  onTypingAllow: () => void;
}
const initial: Context = {
  typingStarted: false,
  typingDisabled: false,
  onTypingStarted: () => {},
  onTypingEnded: () => {},
  onTypingDisable: () => {},
  onTypingAllow: () => {},
};

const TypingContext = createContext(initial);

interface Props {
  children: React.ReactNode;
}

const TypingContextProvider = ({ children }: Props) => {
  const [typingStarted, setTypingStarted] = useState(initial.typingStarted);
  const [typingDisabled, setTypingDisabled] = useState(initial.typingDisabled);

  const onTypingStarted = () => setTypingStarted(true);
  const onTypingEnded = () => setTypingStarted(false);

  const onTypingDisable = () => setTypingDisabled(true);
  const onTypingAllow = () => setTypingDisabled(false);

  return (
    <TypingContext.Provider
      value={{
        typingStarted,
        typingDisabled,
        onTypingStarted,
        onTypingEnded,
        onTypingDisable,
        onTypingAllow,
      }}
    >
      {children}
    </TypingContext.Provider>
  );
};

export { TypingContext, TypingContextProvider };
