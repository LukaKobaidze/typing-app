import randomWords from 'random-words';
import { TypingWords } from 'types/typing.type';

const getRandomWords = (quantity: number = 50): TypingWords => {
  const words = randomWords({ exactly: quantity, maxLength: 6 });

  return words.map((word: string) => ({
    isIncorrect: false,
    letters: word
      .split('')
      .map((letter) => ({ letter, type: 'none', extra: false })),
  }));
};

export { getRandomWords };
