import { createContext } from 'react';
import { TypingDifficulty, TypingTime } from 'types/typing.type';

interface Context {
  difficulty: TypingDifficulty;
  time: TypingTime;
  typingStarted: boolean;
  onDifficulty: (difficulty: TypingDifficulty) => void;
  onTime: (time: TypingTime) => void;
  onTypingStart: () => void;
  onTypingEnd: () => void;
}

const TypingContext = createContext<Context>({
  difficulty: 'medium',
  time: 15,
  typingStarted: false,
  onDifficulty: () => {},
  onTime: () => {},
  onTypingStart: () => {},
  onTypingEnd: () => {},
});

export default TypingContext;
