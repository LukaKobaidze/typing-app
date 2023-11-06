import { TypingState } from '../typing.reducer';
import { TypingWords } from '@/components/Typing/types';

export default function restart(
  state: TypingState,
  words?: TypingWords
): TypingState {
  return {
    ...state,
    words:
      words ||
      state.words.map((word) => ({
        isIncorrect: false,
        chars: word.chars.flatMap((char) =>
          char.type === 'extra' ? [] : { content: char.content, type: 'none' }
        ),
      })),
    wordIndex: 0,
    charIndex: 0,
    typed: 0,
    typedCorrectly: 0,
    mistype: 0,
    result: {
      showResults: false,
      timeline: [],
      errors: 0,
      quoteAuthor: undefined,
      testType: null,
    },
    dateTypingStarted: null,
  };
}
