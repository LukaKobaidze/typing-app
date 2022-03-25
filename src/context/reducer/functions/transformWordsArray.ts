import { TypingWordsType } from 'shared/types';

const transformWordsArray = (words: string[]): TypingWordsType => {
  return words.map((word: string) => {
    return word.split('').map((letter) => {
      return {
        letter,
        type: 'none',
        extra: false,
      };
    });
  });
};

export default transformWordsArray;
