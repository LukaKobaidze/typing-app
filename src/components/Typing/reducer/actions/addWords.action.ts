import { TypingState } from '../typing-reducer';
import { getRandomWords } from '../utils/words';

const addWords = (state: TypingState, amount: number): TypingState => {
  return {
    ...state,
    words: [...state.words, ...getRandomWords(amount)],
  };
};

export default addWords;
