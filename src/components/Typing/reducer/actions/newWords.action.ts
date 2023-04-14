import { TypingWords } from 'components/Typing/types';
import { TypingState } from '../typing.reducer';

export default function newWords(
  state: TypingState,
  payload: { words: TypingWords; author?: string }
): TypingState {
  return {
    ...state,
    words: payload.words,
    result: {
      ...state.result,
      quoteAuthor: payload.author,
    },
  };
}
