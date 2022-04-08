import randomWords from 'random-words';
import { TypingDifficulty, TypingWordsType } from 'shared/types';

const getRandomWords = (
  difficulty: TypingDifficulty = 'medium',
  quantity: number = 100
): TypingWordsType => {
  let words: string[];

  switch (difficulty) {
    case 'medium':
      words = randomWords({ exactly: quantity, maxLength: 4 });
      break;
    case 'hard':
      words = randomWords(quantity);
      break;
  }

  return words.map((word: string) =>
    word.split('').map((letter) => ({ letter, type: 'none', extra: false }))
  );
};

export { getRandomWords };
