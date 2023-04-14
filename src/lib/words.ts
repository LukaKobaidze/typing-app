import randomWords from 'random-words';
import { TypingWords } from 'components/Typing/types';
import { getTypingWords } from 'utils';

const getRandomWords = (quantity: number = 50): TypingWords => {
  return getTypingWords(randomWords({ exactly: quantity, maxLength: 6 }));
};

export { getRandomWords };
