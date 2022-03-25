import { TypingState, TypingTime } from 'shared/types';
import { getRandomWords } from '../../utils';

const setTime = (state: TypingState, time: TypingTime): TypingState => {
  window.localStorage.setItem('time', String(time));

  const words =
    state.timerCountdown !== state.initialTime
      ? getRandomWords(state.difficulty)
      : state.words;

  return {
    ...state,
    initialTime: time,
    timerCountdown: time,
    typingStarted: false,
    wordIndex: 0,
    letterIndex: 0,
    words,
  };
};

export default setTime;
