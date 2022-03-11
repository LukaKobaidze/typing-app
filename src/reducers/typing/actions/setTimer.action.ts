import { TypingState, TypingTime } from 'shared/types/typing.type';
import { getRandomWords, transformWordsArray } from '../functions';

const setTimer = (state: TypingState, time: TypingTime): TypingState => {
  window.localStorage.setItem('time', String(time));

  const words =
    state.timerCountdown !== state.initialTime
      ? transformWordsArray(getRandomWords(state.difficulty))
      : state.words;

  return {
    ...state,
    initialTime: time,
    timerCountdown: time,
    typingStarted: false,
    currentWord: 0,
    currentLetter: 0,
    words,
  };
};

export default setTimer;
