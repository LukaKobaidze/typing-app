import { useContext, useEffect, useRef, useState } from 'react';
import { TypingContext } from 'context';
import TypingRestart from './TypingRestart';
import TypingResult from './TypingResult';
import TypingTimer from './TypingTimer';
import TypingWord from './TypingWord';
import TypingCapsLock from './TypingCapsLock';
import styles from 'styles/Typing/Typing.module.scss';

const Typing = () => {
  const { state, dispatch } = useContext(TypingContext);
  const [isCapsLock, setIsCapsLock] = useState(false);
  const wordRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (state.typingStarted) {
      hiddenInputRef.current?.focus();
      interval = setInterval(() => {
        dispatch({ type: 'TIME_DECREMENT' });
      }, 1000);
    } else {
      hiddenInputRef.current?.blur();
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

  const wordsStyle: React.CSSProperties = {
    transform: `translateY(-${Math.max(
      wordRef.current?.offsetTop! -
        wordRef.current?.clientHeight! -
        wordRef.current?.clientHeight! / 2,
      0
    )}px)`,
  };

  return (
    <div className={styles.typing} tabIndex={0}>
      {!state.results.showResults ? (
        <div className={styles['typing__container']}>
          <TypingTimer seconds={state.timerCountdown} />
          {isCapsLock && <TypingCapsLock />}
          <div className={styles['typing__words__wrapper']}>
            <input
              type="text"
              className={styles['hidden-input']}
              autoCapitalize="off"
              ref={hiddenInputRef}
            />
            <div
              className={styles['typing__words']}
              style={state.typingStarted ? wordsStyle : {}}
            >
              {state.words.map((word, index) => (
                <TypingWord
                  key={index}
                  word={word}
                  isCurrentWord={index === state.wordIndex}
                  wordRef={index === state.wordIndex ? wordRef : undefined}
                />
              ))}
            </div>
          </div>
          <TypingRestart className={styles.restart} />
        </div>
      ) : (
        <TypingResult />
      )}
    </div>
  );
};

export default Typing;
