import { useContext, useEffect, useState } from 'react';
import { TypingContext } from 'context';
import TypingWords from './TypingWords';
import TypingRestart from './TypingRestart';
import TypingResult from './TypingResult';
import TypingTimer from './TypingTimer';
import TypingCapsLock from './TypingCapsLock';
import styles from 'styles/Typing/Typing.module.scss';

const Typing = () => {
  const { state, dispatch } = useContext(TypingContext);
  const [isCapsLock, setIsCapsLock] = useState(false);

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
    if (state.timerCountdown === 0) {
      dispatch({ type: 'RESULT' });
    }
  }, [state.timerCountdown, dispatch]);

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
        return dispatch({ type: 'SKIP_WORD' });
      }
      if (key.length === 1) {
        return dispatch({ type: 'TYPE', payload: key });
      }
    };

    document.addEventListener('keydown', typeHandler);

    return () => document.removeEventListener('keydown', typeHandler);
  }, [dispatch]);

  return (
    <div className={styles.typing}>
      {!state.results.showResults ? (
        <div className={styles['typing__container']}>
          <TypingTimer seconds={state.timerCountdown} />
          {isCapsLock && <TypingCapsLock />}
          <TypingWords />
          <TypingRestart className={styles.restart} />
        </div>
      ) : (
        <TypingResult />
      )}
    </div>
  );
};

export default Typing;
