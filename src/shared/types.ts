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

type TypingResultType = { wpm: number; accuracy: number };

interface TypingResultsType extends TypingResultType {
  showResults: boolean;
  timeline: { wpm: number; accuracy: number }[];
  time: TypingTime;
  difficulty: TypingDifficulty;
  isBest: boolean;
}

type TypingPreviousResults = {
  best: TypingResultType | null;
  recent: TypingResultType[];
};

type TypingState = {
  typingStarted: boolean;
  wordIndex: number;
  letterIndex: number;
  words: TypingWordsType;
  initialTime: TypingTime;
  timerCountdown: number;
  difficulty: TypingDifficulty;
  wordsTimeline: TypingWordsType[];
  results: TypingResultsType;
  previousResults: TypingPreviousResults;
};

export type {
  TypingLetterType,
  TypingWordsType,
  TypingDifficulty,
  TypingTime,
  TypingSettings,
  TypingResultType,
  TypingResultsType,
  TypingPreviousResults,
  TypingState,
};
