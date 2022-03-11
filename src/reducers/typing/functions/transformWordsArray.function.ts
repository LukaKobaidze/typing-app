import { TypingWordsType } from 'shared/types/typing.type';

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
