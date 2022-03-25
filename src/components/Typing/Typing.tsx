import { useContext, useEffect, useRef } from 'react';
import { TypingContext } from 'context';
import TypingReset from './TypingRestart';
import TypingResult from './TypingResult';
import TypingTimer from './TypingTimer';
import TypingWord from './TypingWord';
import styles from 'styles/Typing/Typing.module.scss';

const Typing = () => {
  const { state, dispatch } = useContext(TypingContext);
  const wordRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

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
    const typeHandler = (event: KeyboardEvent) => {
      const { key } = event;

      if (event.ctrlKey && key === 'Backspace') {
        return dispatch({ type: 'DELETE_WORD' });
      }

      if (key === 'Backspace') {
        return dispatch({ type: 'DELETE_KEY' });
      }

      if (key.length === 1) {
        if (key === ' ') {
          // prevent spacebar from scrolling page
          event.preventDefault();
        }

        return dispatch({ type: 'TYPE', payload: key });
      }
    };

    document.addEventListener('keydown', typeHandler);

    return () => document.removeEventListener('keydown', typeHandler);
  }, [dispatch]);

  const typingClickHandler = () => {
    hiddenInputRef.current?.focus();
  };

  const wordsStyle: React.CSSProperties = {
    transform: `translateY(-${Math.max(
      wordRef.current?.offsetTop! - wordRef.current?.clientHeight! - 15,
      0
    )}px)`,
  };

  return (
    <div className={styles.typing} tabIndex={0} onClick={typingClickHandler}>
      <input
        type="text"
        className={styles['hidden-input']}
        ref={hiddenInputRef}
      />
      <TypingTimer seconds={state.timerCountdown} />
      <div className={styles['typing__words__wrapper']}>
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
      <TypingReset />
      {state.timerCountdown === 0 && (
        <TypingResult
          typedWords={state.words.slice(0, state.wordIndex + 1)}
          secondsTook={state.initialTime}
        />
      )}
    </div>
  );
};

export default Typing;
