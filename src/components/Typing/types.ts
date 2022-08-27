type TypingLetter = 'correct' | 'incorrect' | 'extra' | 'none';

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
};

export type { TypingLetter, TypingWords, TypingResult };
