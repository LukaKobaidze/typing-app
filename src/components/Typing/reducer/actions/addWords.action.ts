import { getRandomWords } from 'lib/words';
import { TypingState } from '../typing-reducer';

const addWords = (state: TypingState, amount: number): TypingState => {
  return {
    ...state,
    words: [...state.words, ...getRandomWords(amount)],
  };
};

export default addWords;
