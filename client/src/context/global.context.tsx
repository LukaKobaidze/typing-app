import { createContext, useState } from 'react';

interface Context {
  typingStarted: boolean;
  onTypingStart: () => void;
  onTypingEnd: () => void;
}
const initial: Context = {
  typingStarted: false,
  onTypingStart: () => {},
  onTypingEnd: () => {},
};

const GlobalContext = createContext(initial);

interface Props {
  children: React.ReactNode;
}

const GlobalContextProvider = ({ children }: Props) => {
  const [typingStarted, setTypingStarted] = useState(initial.typingStarted);

  const onTypingStart = () => setTypingStarted(true);
  const onTypingEnd = () => setTypingStarted(false);

  return (
    <GlobalContext.Provider value={{ typingStarted, onTypingStart, onTypingEnd }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
