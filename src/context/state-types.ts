export type TypingLetterType = 'correct' | 'incorrect' | 'none';

export type TypingWordsType = {
  letter: string;
  type: TypingLetterType;
  extra: boolean;
}[][];

export type TypingDifficulty = 'medium' | 'hard';
export type TypingTime = 1 | 15 | 30 | 60 | 120;

export type TypingSettings = {
  difficulty: TypingDifficulty;
  timer: TypingTime;
};

export type TypingResult = { wpm: number; accuracy: number };

export type TypingResults = {
  best: TypingResult | null;
  recent: TypingResult[];
};

export type TypingState = {
  typingStarted: boolean;
  wordIndex: number;
  letterIndex: number;
  words: TypingWordsType;
  initialTime: TypingTime;
  timerCountdown: number;
  difficulty: TypingDifficulty;
  results: TypingResults;
};
