import { useEffect, useReducer } from 'react';
import { TypingDifficulty, TypingTime } from 'shared/types/typing.type';
import Header from 'components/Header/Header';
import Typing from 'components/Typing/Typing';
import Footer from 'components/Footer/Footer';
import typingReducer from 'reducers/typing/typing.reducer';

const initialDifficulty = (): TypingDifficulty =>
  (window.localStorage.getItem('difficulty') as TypingDifficulty) || 'medium';

const initialTime = (): TypingTime =>
  (Number(window.localStorage.getItem('time')) as TypingTime) || 30;

const App = () => {
  const [typingState, typingDispatch] = useReducer(typingReducer, {
    typingStarted: false,
    currentWord: 0,
    currentLetter: 0,
    difficulty: initialDifficulty(),
    initialTime: initialTime(),
    timerCountdown: initialTime(),
    words: [],
  });

  useEffect(() => {
    typingDispatch({ type: 'RESET' });
  }, []);

  useEffect(() => {
    let countdownInterval: NodeJS.Timer;

    if (typingState.typingStarted) {
      countdownInterval = setInterval(() => {
        typingDispatch({ type: 'COUNTDOWN_DECREMENT' });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }

    if (!typingState.typingStarted) {
      clearInterval(countdownInterval!);
    }
  }, [typingState.typingStarted]);

  const type = (key: string) => {
    typingDispatch({ type: 'TYPE', payload: key });
  };

  const deleteKey = () => {
    typingDispatch({ type: 'DELETE_KEY' });
  };

  const changeDifficulty = (difficulty: TypingDifficulty) => {
    typingDispatch({ type: 'SET_DIFFICULTY', payload: difficulty });
  };

  const changeTimer = (timer: TypingTime) => {
    typingDispatch({ type: 'SET_TIMER', payload: timer });
  };

  return (
    <>
      <Header
        difficulty={typingState.difficulty}
        timer={typingState.initialTime}
        changeDifficulty={changeDifficulty}
        changeTimer={changeTimer}
      />
      <main>
        <Typing typingState={typingState} type={type} deleteKey={deleteKey} />
      </main>
      <Footer />
    </>
  );
};

export default App;
