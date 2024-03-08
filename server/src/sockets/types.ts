export type TypingResult = {
  showResults: boolean;
  timeline: { wpm: number; accuracy: number; raw: number; second: number }[];
  errors: number;
  testType: string | null;
  date?: number;
  quoteAuthor?: string;
};

export type RacePlayerState = {
  id: string;
  wordIndex: number;
  charIndex: number;
  result?: TypingResult;
  playAgain?: boolean;
  disconnected?: boolean;
};

export type RaceStateType = {
  players: { player1: RacePlayerState; player2?: RacePlayerState };
  quoteLength: QuoteLengthType;
  testText?: string;
};

export type QuoteLengthType = 'short' | 'medium' | 'long' | 'all';