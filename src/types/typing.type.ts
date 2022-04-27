type TypingLetter = 'correct' | 'incorrect' | 'extra' | 'none';

type TypingWords = {
  letter: string;
  type: TypingLetter;
}[][];

type TypingDifficulty = 'medium' | 'hard';

type TypingTime = 15 | 30 | 60 | 120;

type TypingSettings = {
  difficulty: TypingDifficulty;
  time: TypingTime;
};

interface TypingResult {
  wpm: number;
  accuracy: number;
  showResults: boolean;
  timeline: { wpm: number; accuracy: number }[];
  time: TypingTime;
  difficulty: TypingDifficulty;
}

export type {
  TypingLetter,
  TypingWords,
  TypingDifficulty,
  TypingTime,
  TypingSettings,
  TypingResult,
};
