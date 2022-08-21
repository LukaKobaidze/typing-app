type TypingLetter = 'correct' | 'incorrect' | 'extra' | 'none';
type TypingMode = 'time' | 'words';
type TypingTime = 15 | 30 | 60 | 120;
type TypingWordsAmount = 10 | 25 | 50 | 100;

type TypingSettings = {
  mode: TypingMode;
  time: TypingTime;
};

type TypingWords = {
  isIncorrect: boolean;
  letters: {
    letter: string;
    type: TypingLetter;
  }[];
}[];

type TypingResult = {
  wpm: number;
  accuracy: number;
  showResults: boolean;
  timeline: { wpm: number; accuracy: number }[];
  time: TypingTime;
}

export type {
  TypingLetter,
  TypingMode,
  TypingTime,
  TypingWordsAmount,
  TypingSettings,
  TypingWords,
  TypingResult,
};
