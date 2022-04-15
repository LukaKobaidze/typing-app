import { useContext, useEffect, useRef, useState } from 'react';
import { TypingContext } from 'context';
import TypingRestart from './TypingRestart';
import TypingResult from './TypingResult';
import TypingTimer from './TypingTimer';
import TypingWord from './TypingWord';
import TypingCapsLock from './TypingCapsLock';
import TypingCaret from './TypingCaret';
import styles from 'styles/Typing/Typing.module.scss';

const Typing = () => {
  const { state, dispatch } = useContext(TypingContext);
  const [isCapsLock, setIsCapsLock] = useState(false);
  const [caretPos, setCaretPos] = useState({ x: 0, y: 0 });
  const [wordsOffset, setWordsOffset] = useState(0);
  const wordRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLSpanElement>(null);
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

  useEffect(() => {
    if (!wordRef.current) return;

    if (!letterRef.current) {
      const { offsetLeft, offsetTop, offsetWidth } = wordRef.current;
      return setCaretPos({
        x: offsetLeft + offsetWidth,
        y: offsetTop - wordsOffset,
      });
    }

    const { offsetLeft, offsetTop } = letterRef.current;
    setCaretPos({ x: offsetLeft, y: offsetTop - wordsOffset });
  }, [state.wordIndex, state.letterIndex, wordsOffset]);

  useEffect(() => {
    if (!wordRef.current) return;
    const { offsetTop, clientHeight } = wordRef.current;

    setWordsOffset(Math.max(offsetTop! - clientHeight! - clientHeight! / 2, 0));
  }, [state.wordIndex]);

  return (
    <div className={styles.typing} tabIndex={0}>
      {!state.results.showResults ? (
        <div className={styles['typing__container']}>
          <TypingTimer seconds={state.timerCountdown} />
          {isCapsLock && <TypingCapsLock />}
          <div className={styles['typing__words__wrapper']}>
            <TypingCaret position={caretPos} />
            <input
              type="text"
              className={styles['hidden-input']}
              autoCapitalize="off"
              ref={hiddenInputRef}
            />
            <div
              className={styles['typing__words']}
              style={
                state.typingStarted
                  ? { transform: `translateY(-${wordsOffset}px)` }
                  : {}
              }
            >
              {state.words.map((word, index) => {
                const isCurrentWord = index === state.wordIndex;
                return (
                  <TypingWord
                    key={index}
                    word={word}
                    wordRef={isCurrentWord ? wordRef : undefined}
                    letterRef={isCurrentWord ? letterRef : undefined}
                  />
                );
              })}
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
