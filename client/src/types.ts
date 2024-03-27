export type TypingResult = {
  timeline: { wpm: number; accuracy: number; raw: number; second: number }[];
  errors: number;
  testType: string | null;
  quoteAuthor?: string;
  date?: Date;
};

export type OneVersusOnePlayerState = {
  id: string;
  wordIndex: number;
  charIndex: number;
  result?: TypingResult;
  playAgain?: boolean;
  disconnected?: boolean;
};

export type OneVersusOneStateType = {
  players: { player1: OneVersusOnePlayerState; player2?: OneVersusOnePlayerState };
  quoteLength: QuoteLengthType;
  testText?: string;
};

export type QuoteLengthType = 'short' | 'medium' | 'long' | 'all';
