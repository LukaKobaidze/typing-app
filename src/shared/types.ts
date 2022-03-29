type TypingLetterType = 'correct' | 'incorrect' | 'extra' | 'none';

type TypingWordsType = {
  letter: string;
  type: TypingLetterType;
}[][];

type TypingDifficulty = 'medium' | 'hard';
type TypingTime = 15 | 30 | 60 | 120;

type TypingSettings = {
  difficulty: TypingDifficulty;
  timer: TypingTime;
};

type TypingResult = { wpm: number; accuracy: number };

type TypingResults = {
  best: TypingResult | null;
  recent: TypingResult[];
};

type TypingState = {
  typingStarted: boolean;
  wordIndex: number;
  letterIndex: number;
  words: TypingWordsType;
  initialTime: TypingTime;
  timerCountdown: number;
  difficulty: TypingDifficulty;
  results: TypingResults;
};

export type {
  TypingLetterType,
  TypingWordsType,
  TypingDifficulty,
  TypingTime,
  TypingSettings,
  TypingResult,
  TypingResults,
  TypingState,
};
