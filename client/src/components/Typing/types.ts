type TypingCharType = 'correct' | 'incorrect' | 'extra' | 'none';

type TypingWords = {
  isIncorrect: boolean;
  chars: {
    content: string;
    type: TypingCharType;
  }[];
}[];

export type { TypingCharType, TypingWords };
