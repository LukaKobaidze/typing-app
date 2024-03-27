import { getRandomWords } from '@/helpers';
import { TypingState } from '../typing.reducer';
import { TypingWords } from '../../types';

export default function addWords(
  state: TypingState,
  words: TypingWords
): TypingState {
  if (state.result.showResult) return state;

  return {
    ...state,
    words: [...state.words, ...words],
  };
}
