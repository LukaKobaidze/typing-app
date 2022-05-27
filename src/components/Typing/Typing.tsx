import { useContext, useEffect, useReducer, useState } from 'react';
import { GlobalContext } from 'context';
import typingReducer, { initialState } from './reducer/typing-reducer';
import TypingWords from './TypingWords';
import TypingRestart from './TypingRestart';
import TypingResult from './TypingResult';
import TypingTimer from './TypingTimer';
import TypingCapsLock from './TypingCapsLock';
import styles from 'styles/Typing/Typing.module.scss';

const Typing = () => {
  const [state, dispatch] = useReducer(typingReducer, initialState);
  const { difficulty, time, typingStarted, onTypingStart } =
    useContext(GlobalContext);
  const [isCapsLock, setIsCapsLock] = useState(false);

  useEffect(() => {
    dispatch({ type: 'RESTART', payload: { difficulty, time } });
  }, [difficulty, time]);

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (state.typingStarted) {
      interval = setInterval(() => {
        dispatch({ type: 'TIME_DECREMENT' });
      }, 1000);
    } else {
      clearInterval(interval!);
    }

    return () => clearInterval(interval);
  }, [state.typingStarted, dispatch]);

  useEffect(() => {
    if (state.timeCountdown === 0) {
      dispatch({ type: 'RESULT' });
    }
  }, [state.timeCountdown, dispatch]);

  useEffect(() => {
    const typeHandler = (event: KeyboardEvent) => {
      const { key } = event;

      if (event.getModifierState && event.getModifierState('CapsLock')) {
        setIsCapsLock(true);
      } else {
        setIsCapsLock(false);
      }
      if (event.ctrlKey && key === 'Backspace') {
        return dispatch({ type: 'DELETE_WORD' });
      }
      if (key === 'Backspace') {
        return dispatch({ type: 'DELETE_KEY' });
      }
      if (key === ' ') {
        // prevent spacebar from scrolling page
        event.preventDefault();
        return dispatch({ type: 'NEXT_WORD', payload: difficulty });
      }
      if (key.length === 1) {
        if (!typingStarted) onTypingStart();
        return dispatch({ type: 'TYPE', payload: key });
      }
    };

    document.addEventListener('keydown', typeHandler);

    return () => document.removeEventListener('keydown', typeHandler);
  }, [difficulty, typingStarted, onTypingStart, dispatch]);

  const onRestart = () =>
    dispatch({ type: 'RESTART', payload: { difficulty, time } });

  return (
    <div className={styles.typing}>
      {!state.result.showResults ? (
        <div className={styles['typing__container']}>
          <TypingTimer seconds={state.timeCountdown} />
          {isCapsLock && <TypingCapsLock />}
          <TypingWords
            words={state.words}
            wordIndex={state.wordIndex}
            letterIndex={state.letterIndex}
          />
          <TypingRestart onRestart={onRestart} className={styles.restart} />
        </div>
      ) : (
        <TypingResult result={state.result} onRestart={onRestart} />
      )}
    </div>
  );
};

export default Typing;
