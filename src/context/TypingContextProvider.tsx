import { useReducer } from 'react';
import typingReducer from './reducer/typing-reducer';
import TypingContext, { initialTypingState } from './typing-context';

interface Props {
  children: React.ReactNode;
}

const TypingContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(typingReducer, initialTypingState);

  return (
    <TypingContext.Provider value={{ state, dispatch }}>
      {children}
    </TypingContext.Provider>
  );
};

export default TypingContextProvider;
