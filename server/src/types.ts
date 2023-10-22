export type RoomPlayerState = {
  id: string;
  wordIndex: number;
  charIndex: number;
  result?: {
    showResults: boolean;
    timeline: { wpm: number; accuracy: number; raw: number; second: number }[];
    errors: number;
    testType: string | null;
    date?: number;
    quoteAuthor?: string;
  };
};

export type RoomStateType = {
  [key: string]: {
    players: { player1: RoomPlayerState; player2?: RoomPlayerState };
    testText?: string;
  };
};

