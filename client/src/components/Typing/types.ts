type TypingCharType = 'correct' | 'incorrect' | 'extra' | 'none';

type TypingWords = {
  isIncorrect: boolean;
  chars: {
    content: string;
    type: TypingCharType;
  }[];
}[];

type TypingResult = {
  showResults: boolean;
  timeline: { wpm: number; accuracy: number; raw: number; second: number }[];
  errors: number;
  testType: string | null;
  date?: number;
  quoteAuthor?: string;
};

export type { TypingCharType, TypingWords, TypingResult };
