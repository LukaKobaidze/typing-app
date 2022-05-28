import { TypingSettings } from 'types/typing.type';
import { TypingState } from '../typing-reducer';
import { getRandomWords } from '../utils/words';

const restart = (state: TypingState, payload: TypingSettings): TypingState => {
  const words = getRandomWords(payload.difficulty);

  return {
    ...state,
    timeCountdown: payload.time,
    wordIndex: 0,
    letterIndex: 0,
    words,
    wordsTimeline: [],
    result: {
      ...state.result,
      showResults: false,
      timeline: [],
    },
  };
};

export default restart;
