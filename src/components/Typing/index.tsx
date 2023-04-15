import { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { GlobalContext } from 'context/global-context';
import { ReactComponent as IconLock } from 'assets/images/lock.svg';
import typingReducer, { initialState } from './reducer/typing.reducer';
import { getRandomQuote, getRandomWords, getTypingWords } from 'helpers';
import { LoadingSpinner } from 'components/UI';
import Input from './Input';
import Restart from './Restart';
import Result from './Result';
import Counter from './Counter';
import styles from 'styles/Typing/Typing.module.scss';

// Used to abort previous fetch call if new one is called
let quoteAbortController: AbortController | null = null;

export default function Typing() {
  const [state, dispatch] = useReducer(typingReducer, initialState);
  const { mode, wordsAmount, time, quoteLength, typingStarted, onTypingStart } =
    useContext(GlobalContext);
  const [isCapsLock, setIsCapsLock] = useState(false);
  const [timeCountdown, setTimeCountdown] = useState<number>(time);
  const [wordCount, setWordCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cursorHidden, setCursorHidden] = useState(false);

  useEffect(() => {
    const handleMouseMove = () => {
      setCursorHidden(false);
    };

    if (cursorHidden) {
      document.documentElement.style.cursor = 'none';
      document.addEventListener('mousemove', handleMouseMove);
    } else {
      document.documentElement.style.cursor = 'auto';
      document.removeEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorHidden]);

  useEffect(() => {
    const typeHandler = (event: KeyboardEvent) => {
      const { key } = event;

      if (key === 'Escape') {
        setCursorHidden(false);
      }

      if (event.getModifierState && event.getModifierState('CapsLock')) {
        setIsCapsLock(true);
      } else {
        setIsCapsLock(false);
      }
      if (event.ctrlKey && key === 'Backspace') {
        setCursorHidden(true);
        return dispatch({ type: 'DELETE_WORD' });
      }
      if (key === 'Backspace') {
        setCursorHidden(true);
        return dispatch({ type: 'DELETE_KEY' });
      }
      if (key === ' ') {
        event.preventDefault();
        setCursorHidden(true);
        return dispatch({ type: 'NEXT_WORD' });
      }
      if (key.length === 1) {
        if (!typingStarted) {
          onTypingStart();
          dispatch({ type: 'START' });
        }
        setCursorHidden(true);
        return dispatch({ type: 'TYPE', payload: key });
      }
    };
    if (state.result.showResults) {
      document.removeEventListener('keydown', typeHandler);
    } else document.addEventListener('keydown', typeHandler);

    return () => document.removeEventListener('keydown', typeHandler);
  }, [typingStarted, onTypingStart, state.result.showResults]);

  const onRestart = useCallback(() => {
    if (mode === 'time') {
      dispatch({ type: 'RESTART', payload: getRandomWords() });
      setTimeCountdown(time);
    } else if (mode === 'words') {
      dispatch({ type: 'RESTART', payload: getRandomWords(wordsAmount) });
      setWordCount(0);
    } else {
      dispatch({ type: 'RESTART', payload: [] });
      setWordCount(0);

      quoteAbortController?.abort();
      quoteAbortController = new AbortController();

      setIsLoading(true);

      getRandomQuote(quoteLength, quoteAbortController).then((data) => {
        dispatch({
          type: 'NEW_WORDS',
          payload: {
            words: getTypingWords(data.content.split(' ')),
            author: data.author,
          },
        });
        setIsLoading(false);
      });
    }
  }, [time, mode, wordsAmount, quoteLength]);

  useEffect(() => {
    if (mode === 'time') return;

    const lastWordCorrect =
      state.wordIndex === state.words.length - 1 &&
      state.words[state.wordIndex].chars.every((char) => char.type === 'correct');
    if (state.wordIndex === state.words.length || lastWordCorrect) {
      dispatch({ type: 'RESULT' });
      setCursorHidden(false);
    } else {
      setWordCount(state.wordIndex);
    }
  }, [mode, state.words, state.charIndex, state.wordIndex]);

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
      dispatch({ type: 'RESULT', payload: time });
      setCursorHidden(false);
    }
  }, [timeCountdown, time]);

  return (
    <div className={styles.typing}>
      {!state.result.showResults ? (
        <div className={styles['typing__container']}>
          <Counter
            mode={mode}
            counter={mode === 'time' ? timeCountdown : wordCount}
            wordsLength={state.words.length}
          />

          {isCapsLock && (
            <div className={styles.capslock}>
              <IconLock className={styles.icon} />
              <p>CAPS LOCK</p>
            </div>
          )}
          <Input
            words={state.words}
            wordIndex={state.wordIndex}
            charIndex={state.charIndex}
            cursorHidden={cursorHidden}
          />
          <Restart onRestart={onRestart} className={styles.restart} />
        </div>
      ) : (
        <Result result={state.result} onRestart={onRestart} />
      )}

      {isLoading && <LoadingSpinner className={styles['loading-spinner']} />}
    </div>
  );
}
