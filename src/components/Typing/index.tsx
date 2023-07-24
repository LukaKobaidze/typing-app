import { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { GlobalContext } from 'context/global.context';
import { TypemodeContext } from 'context/typemode.context';
import { CustomizeContext } from 'context/customize.context';
import { IconLock } from 'assets/image';
import typewriterSound from 'assets/audio/typewriter.wav';
import typingReducer, { initialState } from './reducer/typing.reducer';
import { getRandomQuote, getRandomWords, getTypingWords } from 'helpers';
import { useSound } from 'hooks';
import { LoadingSpinner } from 'components/UI';
import Input from './Input';
import Restart from './Restart';
import Result from './Result';
import Counter from './Counter';
import styles from 'styles/Typing/Typing.module.scss';
import { TypingResult } from './types';

interface Props {
  disabled: boolean;
  onNewResult: (newResult: TypingResult) => void;
}

// Used to abort previous fetch call if new one is called
let quoteAbortController: AbortController | null = null;

export default function Typing(props: Props) {
  const { disabled, onNewResult } = props;

  const [state, dispatch] = useReducer(typingReducer, initialState);
  const { typingStarted, onTypingStart, onTypingEnd } = useContext(GlobalContext);
  const { mode, wordsAmount, time, quoteLength } = useContext(TypemodeContext);
  const { liveWpm, liveAccuracy, inputWidth, soundOnClick } =
    useContext(CustomizeContext);
  const [isCapsLock, setIsCapsLock] = useState(false);
  const [timeCountdown, setTimeCountdown] = useState<number>(time);
  const [wordCount, setWordCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cursorHidden, setCursorHidden] = useState(false);
  const playTypingSound = useSound(typewriterSound, 0.3);

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
        if (soundOnClick) playTypingSound();
        return dispatch({ type: 'DELETE_WORD' });
      }
      if (key === 'Backspace') {
        setCursorHidden(true);
        if (soundOnClick) playTypingSound();
        return dispatch({ type: 'DELETE_KEY' });
      }
      if (key === ' ') {
        event.preventDefault();
        setCursorHidden(true);
        if (soundOnClick) playTypingSound();
        return dispatch({ type: 'NEXT_WORD' });
      }
      if (key.length === 1) {
        if (!typingStarted) {
          onTypingStart();
          dispatch({
            type: 'START',
            payload: `${mode} ${
              mode === 'time' ? time : mode === 'words' ? wordsAmount : quoteLength
            }`,
          });
        }
        setCursorHidden(true);
        if (soundOnClick) playTypingSound();
        return dispatch({ type: 'TYPE', payload: key });
      }
    };
    if (state.result.showResults || disabled) {
      document.removeEventListener('keydown', typeHandler);
    } else document.addEventListener('keydown', typeHandler);

    return () => document.removeEventListener('keydown', typeHandler);
  }, [
    typingStarted,
    onTypingStart,
    state.result.showResults,
    mode,
    quoteLength,
    time,
    wordsAmount,
    disabled,
    playTypingSound,
    soundOnClick,
  ]);

  const onRestart = useCallback(() => {
    onTypingEnd();

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
            words: getTypingWords(
              data.content.replace(/—/g, '-').replace(/…/g, '...').split(' ')
            ),
            author: data.author,
          },
        });
        setIsLoading(false);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, mode, wordsAmount, quoteLength]);

  const onRepeat = () => {
    onTypingEnd();
    dispatch({ type: 'RESTART' });

    if (mode === 'time') {
      setTimeCountdown(time);
    } else if (mode === 'words') {
      setWordCount(0);
    }
  };

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

  useEffect(() => {
    if (state.result.showResults) {
      onNewResult(state.result);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.result.showResults, onNewResult]);

  const timelineLatest = state.result.timeline[state.result.timeline.length - 1];

  return (
    <div className={styles.typing}>
      {!state.result.showResults ? (
        <>
          <div className={styles.liveResult}>
            {liveWpm && (
              <div className={styles.liveResultItem}>
                <span>wpm</span>
                <span>{timelineLatest?.wpm || '-'}</span>
              </div>
            )}
            {liveAccuracy && (
              <div className={styles.liveResultItem}>
                <span>accuracy</span>
                <span>{timelineLatest?.accuracy || '-'}</span>
              </div>
            )}
          </div>

          <div
            className={styles['typing__container']}
            style={{ width: inputWidth * 0.8 + '%' }}
          >
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
        </>
      ) : (
        <Result result={state.result} onRestart={onRestart} onRepeat={onRepeat} />
      )}

      {isLoading && <LoadingSpinner className={styles['loading-spinner']} />}
    </div>
  );
}
