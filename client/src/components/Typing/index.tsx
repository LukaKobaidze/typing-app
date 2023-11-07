import { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { GlobalContext } from '@/context/global.context';
import { TypemodeContext } from '@/context/typemode.context';
import { CustomizeContext } from '@/context/customize.context';
import { StatsContext } from '@/context/stats.context';
import { IconLock } from '@/assets/image';
import typewriterSound from '@/assets/audio/typewriter.wav';
import typingReducer, { initialState } from './reducer/typing.reducer';
import { getRandomQuote, getRandomWords, getTypingWords } from '@/helpers';
import { useSound } from '@/hooks';
import { Loading } from '@/components/UI';
import Input from './Input';
import Restart from './Restart';
import Result from './Result';
import Counter from './Counter';
import LoadingError from './LoadingError';
import styles from '@/styles/Typing/Typing.module.scss';
import counterStyles from '@/styles/Typing/Counter.module.scss';
import { TypingResult } from 'shared/types';

interface Props {
  disabled: boolean;
  testText?: string;
  secondCaret?: { wordIndex: number; charIndex: number };
  raceMode?: boolean;
  typeModeCustom?: string;
  onCaretPositionChange?: (wordIndex: number, charIndex: number) => void;
  onResult?: (result: TypingResult) => void;
}

// Used to abort previous fetch call if new one is called
let quoteAbortController: AbortController | null = null;

export default function Typing(props: Props) {
  const {
    disabled,
    testText,
    secondCaret,
    raceMode,
    typeModeCustom,
    onCaretPositionChange,
    onResult,
  } = props;

  const { typingStarted, onTypingStart, onTypingEnd } = useContext(GlobalContext);
  const [state, dispatch] = useReducer(typingReducer, initialState);
  const { onTestStart, onTestComplete } = useContext(StatsContext);
  const { mode, wordsAmount, time, quoteLength } = useContext(TypemodeContext);
  const { liveWpm, liveAccuracy, inputWidth, soundOnClick } =
    useContext(CustomizeContext);
  const [isCapsLock, setIsCapsLock] = useState(false);
  const [timeCountdown, setTimeCountdown] = useState<number>(time);
  const [wordCount, setWordCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cursorHidden, setCursorHidden] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const playTypingSound = useSound(typewriterSound, 0.3);

  const isDisabled = disabled || (raceMode && !typingStarted);

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
        if (!typingStarted && !raceMode) {
          onTypingStart();
        }
        setCursorHidden(true);
        if (soundOnClick) playTypingSound();
        return dispatch({ type: 'TYPE', payload: key });
      }
    };
    if (state.result.showResults || isDisabled) {
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
    isDisabled,
    playTypingSound,
    soundOnClick,
    raceMode,
  ]);

  useEffect(() => {
    if (typingStarted) {
      dispatch({
        type: 'START',
        payload:
          typeModeCustom ||
          `${mode} ${
            mode === 'time' ? time : mode === 'words' ? wordsAmount : quoteLength
          }`,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typingStarted]);

  const onRestart = useCallback(() => {
    onTypingEnd();

    quoteAbortController?.abort();
    quoteAbortController = new AbortController();
    setIsLoading(false);
    setIsLoadingError(false);

    if (testText !== undefined) {
      if (!testText.trim().length) {
        setIsLoading(true);
      } else {
        dispatch({ type: 'RESTART', payload: getTypingWords(testText.split(' ')) });
        setIsLoading(false);
      }
    }

    if (!raceMode) {
      if (mode === 'time') {
        dispatch({ type: 'RESTART', payload: getRandomWords() });
        setTimeCountdown(time);
      } else if (mode === 'words') {
        dispatch({ type: 'RESTART', payload: getRandomWords(wordsAmount) });
        setWordCount(0);
      } else {
        dispatch({ type: 'RESTART', payload: [] });
        setWordCount(0);

        setIsLoading(true);

        getRandomQuote(quoteLength, quoteAbortController)
          .then((data) => {
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
            setIsLoadingError(false);
          })
          .catch((err) => {
            if (String(err).startsWith('AbortError')) return;

            setIsLoading(false);
            setIsLoadingError(true);
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, mode, wordsAmount, quoteLength, testText, raceMode]);

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
    if (!state.words.length || (mode === 'time' && !raceMode)) return;

    const lastWordCorrect =
      state.wordIndex === state.words.length - 1 &&
      state.words[state.wordIndex].chars.every((char) => char.type === 'correct');

    if (state.wordIndex === state.words.length || lastWordCorrect) {
      dispatch({ type: 'RESULT' });
      setCursorHidden(false);
    } else {
      setWordCount(state.wordIndex);
    }
  }, [mode, state.words, state.charIndex, state.wordIndex, raceMode]);

  useEffect(() => {
    if (raceMode) return;

    if (mode === 'time') {
      if ((state.wordIndex + 1) % 10 === 0) {
        dispatch({ type: 'ADD_WORDS', payload: 10 });
      }
    }
  }, [mode, state.wordIndex, raceMode]);

  useEffect(() => {
    onRestart();

    return () => {
      quoteAbortController?.abort();
    };
  }, [onRestart]);

  useEffect(() => {
    if (typingStarted) {
      onTestStart();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typingStarted]);

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (typingStarted) {
      interval = setInterval(() => {
        dispatch({ type: 'TIMELINE' });

        if (mode === 'time' && !raceMode)
          setTimeCountdown((prevState) => prevState - 1);
      }, 1000);
    } else {
      clearInterval(interval!);
    }

    return () => clearInterval(interval);
  }, [typingStarted, mode, raceMode]);

  useEffect(() => {
    if (timeCountdown === 0) {
      dispatch({ type: 'RESULT', payload: time });
      setCursorHidden(false);
    }
  }, [timeCountdown, time]);

  useEffect(() => {
    if (state.result.showResults) {
      onTestComplete(state.result);

      if (onResult) {
        onResult(state.result);
        onTypingEnd();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.result.showResults]);

  useEffect(() => {
    if (onCaretPositionChange) {
      onCaretPositionChange(state.wordIndex, state.charIndex);
    }
  }, [state.wordIndex, state.charIndex, onCaretPositionChange]);

  const timelineLatest = state.result.timeline[state.result.timeline.length - 1];

  return (
    <div className={styles.typing}>
      {raceMode || !state.result.showResults ? (
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
            {raceMode && state.result.showResults ? (
              <div className={counterStyles.counter}>
                Waiting for your opponent to finish...
              </div>
            ) : (
              <Counter
                mode={raceMode ? 'quote' : mode}
                counter={mode === 'time' && !raceMode ? timeCountdown : wordCount}
                wordsLength={state.words.length}
              />
            )}

            {isCapsLock && (
              <div className={styles.capslock}>
                <IconLock className={styles.icon} />
                <p>CAPS LOCK</p>
              </div>
            )}
            {isLoadingError && state.words.length === 0 ? (
              <LoadingError />
            ) : (
              <Input
                words={state.words}
                wordIndex={state.wordIndex}
                charIndex={state.charIndex}
                cursorHidden={cursorHidden}
                secondCaret={secondCaret}
              />
            )}
            {!raceMode && (
              <Restart onRestart={onRestart} className={styles.restart} />
            )}
          </div>
        </>
      ) : (
        <Result result={state.result} onRestart={onRestart} onRepeat={onRepeat} />
      )}

      {isLoading && <Loading type="spinner" className={styles['loading-spinner']} />}
    </div>
  );
}
