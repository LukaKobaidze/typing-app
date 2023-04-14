import { TypingState } from '../typing.reducer';
import { TypingWords } from 'components/Typing/types';

export default function restart(
  state: TypingState,
  words: TypingWords
): TypingState {
  return {
    ...state,
    words,
    wordIndex: 0,
    charIndex: 0,
    typed: 0,
    typedCorrectly: 0,
    mistype: 0,
    wordsTimeline: [],
    result: {
      showResults: false,
      timeline: [],
      errors: 0,
      quoteAuthor: undefined,
    },
    dateTypingStarted: null,
  };
}
