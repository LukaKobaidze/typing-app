import randomWords from 'random-words';
import { TypingDifficulty, TypingWords } from 'types/typing.type';

const getRandomWords = (
  difficulty: TypingDifficulty = 'medium',
  quantity: number = 50
): TypingWords => {
  let words: string[];

  switch (difficulty) {
    case 'medium':
      words = randomWords({ exactly: quantity, maxLength: 5 });
      break;
    case 'hard':
      words = randomWords(quantity);
      break;
  }

  return words.map((word: string) => ({
    isIncorrect: false,
    letters: word
      .split('')
      .map((letter) => ({ letter, type: 'none', extra: false })),
  }));
};

export { getRandomWords };
