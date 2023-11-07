export enum SocketEvent {
  CreateRoom = 'create-room',
  JoinRoom = 'join-room',
  HasJoinedRoom = 'has-joined-room',
  JoinRoomError = 'join-room-error',
  RoomState = 'room-state',
  TestText = 'test-text',
  TypingStartsIn = 'typing-starts-in',
  TypingStarted = 'typing-started',
  CaretPositionChange = 'caret-position-change',
  Result = 'result',
  PlayersState = 'players-state',
  PlayAgain = 'play-again',
  OpponentPlayAgain = 'opponent-play-again',
  OpponentDisconnected = 'opponent-disconnected',
  LeaveRoom = 'leave-room',
}

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
