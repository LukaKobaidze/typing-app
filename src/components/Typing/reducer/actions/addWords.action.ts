import { getRandomWords } from 'lib/words';
import { TypingState } from '../typing.reducer';

export default function addWords(state: TypingState, amount: number): TypingState {
  return {
    ...state,
    words: [...state.words, ...getRandomWords(amount)],
  };
}
