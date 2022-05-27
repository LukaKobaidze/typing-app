import { useState } from 'react';
import { useStorageState } from 'hooks';
import { TypingDifficulty, TypingTime } from 'types/typing.type';
import GlobalContext from './global-context';

interface Props {
  children: React.ReactNode;
}

const GlobalContextProvider = ({ children }: Props) => {
  const [difficulty, setDifficulty] = useStorageState<TypingDifficulty>(
    'typing-difficulty',
    'medium'
  );
  const [time, setTime] = useStorageState<TypingTime>('typing-time', 30);
  const [typingStarted, setTypingStarted] = useState(false);

  const onDifficulty = (difficulty: TypingDifficulty) => {
    setDifficulty(difficulty);
  };

  const onTime = (time: TypingTime) => {
    setTime(time);
  };

  const onTypingStart = () => setTypingStarted(true);
  const onTypingEnd = () => setTypingStarted(false);

  return (
    <GlobalContext.Provider
      value={{
        difficulty,
        time,
        typingStarted,
        onDifficulty,
        onTime,
        onTypingStart,
        onTypingEnd,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
