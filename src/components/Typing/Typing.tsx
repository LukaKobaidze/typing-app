import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { GlobalContext } from 'context';
import { ReactComponent as IconLock } from 'assets/images/lock.svg';
import typingReducer, { initialState } from './reducer/typing-reducer';
import TypingInput from './TypingInput';
import TypingRestart from './TypingRestart';
import TypingResult from './TypingResult';
import TypingCounter from './TypingCounter';
import styles from 'styles/Typing/Typing.module.scss';

const Typing = () => {
  const [state, dispatch] = useReducer(typingReducer, initialState);
  const { mode, wordsAmount, time, typingStarted, onTypingStart } =
    useContext(GlobalContext);
  const [isCapsLock, setIsCapsLock] = useState(false);
  const [timeCountdown, setTimeCountdown] = useState<number>(time);
  const [wordCount, setWordCount] = useState(0);

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
        event.preventDefault();
        return dispatch({ type: 'NEXT_WORD' });
      }
      if (key.length === 1) {
        if (!typingStarted) onTypingStart();
        return dispatch({ type: 'TYPE', payload: key });
      }
    };

    document.addEventListener('keydown', typeHandler);

    return () => document.removeEventListener('keydown', typeHandler);
  }, [typingStarted, onTypingStart]);

  const onRestart = useCallback(() => {
    if (mode === 'time') {
      dispatch({ type: 'RESTART' });
      setTimeCountdown(time);
    } else {
      dispatch({ type: 'RESTART', payload: wordsAmount });
      setWordCount(0);
    }
  }, [time, mode, wordsAmount]);

  useEffect(() => {
    if (mode === 'time') return;

    const lastWordCorrect =
      state.wordIndex === wordsAmount - 1 &&
      state.words[state.wordIndex].letters.every(
        (letter) => letter.type === 'correct'
      );
    if (state.wordIndex === wordsAmount || lastWordCorrect) {
      dispatch({ type: 'RESULT' });
    } else {
      setWordCount(state.wordIndex);
    }
  }, [mode, state.words, state.letterIndex, state.wordIndex, wordsAmount]);

  useEffect(() => {
    if (mode === 'time') {
      if ((state.wordIndex + 1) % 10 === 0) {
        dispatch({ type: 'ADD_WORDS', payload: 10 });
      }
    }
  }, [mode, state.wordIndex]);

  useEffect(() => {
    onRestart();
  }, [onRestart]);

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (typingStarted) {
      interval = setInterval(() => {
        dispatch({ type: 'TIMELINE' });
        if (mode === 'time') setTimeCountdown((prevState) => prevState - 1);
      }, 1000);
    } else {
      clearInterval(interval!);
    }

    return () => clearInterval(interval);
  }, [typingStarted, mode]);

  useEffect(() => {
    if (timeCountdown === 0) {
      dispatch({ type: 'RESULT' });
    }
  }, [timeCountdown, time]);

  return (
    <div className={styles.typing}>
      {!state.result.showResults ? (
        <div className={styles['typing__container']}>
          <TypingCounter
            mode={mode}
            counter={mode === 'time' ? timeCountdown : wordCount}
          />
          {isCapsLock && (
            <div className={styles.capslock}>
              <IconLock className={styles.icon} />
              <p>CAPS LOCK</p>
            </div>
          )}
          <TypingInput
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
