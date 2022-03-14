import randomWords from 'random-words';
import { TypingDifficulty } from '../../state-types';

const getRandomWords = (
  difficulty: TypingDifficulty = 'medium',
  quantity: number = 100
) => {
  let words: string[];

  switch (difficulty) {
    case 'medium':
      words = randomWords({ exactly: quantity, maxLength: 4 });
      break;
    case 'hard':
      words = randomWords(quantity);
      break;
  }

  return words;
};

export default getRandomWords;
