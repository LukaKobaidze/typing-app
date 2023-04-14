import { TypingWords } from 'components/Typing/types';

export function getTypingWords(words: string[]): TypingWords {
  return words.map((word: string) => ({
    isIncorrect: false,
    chars: word.split('').map((char) => ({ content: char, type: 'none' })),
  }));
}

export function getTypingResults(
  typed: number,
  typedCorrectly: number,
  mistype: number,
  timeTook: number
): { wpm: number; raw: number; accuracy: number } {
  const timeTookInMin = timeTook / 60000;

  return {
    wpm: Math.round(typedCorrectly / 5 / timeTookInMin),
    accuracy: Number((((typed - mistype) / typed) * 100).toFixed(2)),
    raw: Math.round(typed / 5 / timeTookInMin),
  };
}

export function twoDecimals(n: number) {
  let log10 = n ? Math.floor(Math.log10(n)) : 0;
  let div = log10 < 0 ? Math.pow(10, 1 - log10) : 100;

  return Math.round(n * div) / div;
}
