import { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { TypingContext } from '@/context/typing.context';
import { TypemodeContext } from '@/context/typemode.context';
import { CustomizeContext } from '@/context/customize.context';
import { StatsContext } from '@/context/stats.context';
import { IconLock } from '@/assets/image';
import typewriterSound from '@/assets/audio/typewriter.wav';
import typingReducer, { initialState } from './reducer/typing.reducer';
import { getRandomWords, getTypingWords } from '@/helpers';
import { useSound } from '@/hooks';
import { Loading } from '@/components/UI';
import Input from './Input';
import Restart from './Restart';
import Result from './Result';
import Counter from './Counter';
import LoadingError from './LoadingError';
import styles from '@/styles/Typing/Typing.module.scss';
import counterStyles from '@/styles/Typing/Counter.module.scss';
import { TypingResult } from '@/types';
import { getRandomQuoteByLength } from '@/services/quotable';

interface Props {
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
    testText,
    secondCaret,
    raceMode,
    typeModeCustom,
    onCaretPositionChange,
    onResult,
  } = props;

  const {
    typingDisabled,
    typingStarted,
    typingFocused,
    onUpdateTypingFocus,
    onTypingStarted,
    onTypingEnded,
  } = useContext(TypingContext);
  const [state, dispatch] = useReducer(typingReducer, initialState);
  const { onTestStart, onTestComplete } = useContext(StatsContext);
  const { mode, words, time, quote, numbers, punctuation } =
    useContext(TypemodeContext);
  const { liveWpm, liveAccuracy, inputWidth, soundOnClick } =
    useContext(CustomizeContext);
  const [isCapsLock, setIsCapsLock] = useState(false);
  const [timeCountdown, setTimeCountdown] = useState<number>(time);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const playTypingSound = useSound(typewriterSound, 0.3);

  const isTypingDisabled =
    typingDisabled || isLoading || isLoadingError || (raceMode && !typingStarted);

  useEffect(() => {
    const handleMouseMove = () => {
      onUpdateTypingFocus(false);
    };

    if (typingFocused) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [typingFocused]);

  useEffect(() => {
    const typeHandler = (event: KeyboardEvent) => {
      const { key } = event;

      if (key === 'Escape') {
        onUpdateTypingFocus(false);
      }

      if (event.getModifierState && event.getModifierState('CapsLock')) {
        setIsCapsLock(true);
      } else {
        setIsCapsLock(false);
      }
      if (event.ctrlKey && key === 'Backspace') {
        onUpdateTypingFocus(true);
        if (soundOnClick) playTypingSound();
        return dispatch({ type: 'DELETE_WORD' });
      }
      if (key === 'Backspace') {
        onUpdateTypingFocus(true);
        if (soundOnClick) playTypingSound();
        return dispatch({ type: 'DELETE_KEY' });
      }
      if (key === ' ') {
        event.preventDefault();
        onUpdateTypingFocus(true);
        if (soundOnClick) playTypingSound();
        return dispatch({ type: 'NEXT_WORD' });
      }
      if (key.length === 1) {
        if (!typingStarted && !raceMode) {
          onTypingStarted();
        }
        onUpdateTypingFocus(true);
        if (soundOnClick) playTypingSound();
        return dispatch({ type: 'TYPE', payload: key });
      }
    };
    if (state.result.showResults || isTypingDisabled) {
      document.removeEventListener('keydown', typeHandler);
    } else document.addEventListener('keydown', typeHandler);

    return () => document.removeEventListener('keydown', typeHandler);
  }, [
    typingStarted,
    onTypingStarted,
    state.result.showResults,
    mode,
    quote,
    time,
    words,
    isTypingDisabled,
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
          `${mode} ${mode === 'time' ? time : mode === 'words' ? words : quote}`,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typingStarted]);

  const onRestart = useCallback(() => {
    onTypingEnded();
    onUpdateTypingFocus(false);

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
        dispatch({
          type: 'RESTART',
          payload: getRandomWords(50, punctuation, numbers),
        });
        setTimeCountdown(time);
      } else if (mode === 'words') {
        dispatch({
          type: 'RESTART',
          payload: getRandomWords(words, punctuation, numbers),
        });
      } else {
        dispatch({ type: 'RESTART', payload: [] });

        setIsLoading(true);

        getRandomQuoteByLength(quote, quoteAbortController)
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
  }, [time, mode, words, quote, testText, raceMode, numbers, punctuation]);

  const onRepeat = () => {
    onTypingEnded();
    onUpdateTypingFocus(false);
    dispatch({ type: 'RESTART' });

    if (mode === 'time') {
      setTimeCountdown(time);
    }
  };

  useEffect(() => {
    if (!state.words.length || (mode === 'time' && !raceMode)) return;

    const lastWordCorrect =
      state.wordIndex === state.words.length - 1 &&
      state.words[state.wordIndex].chars.every((char) => char.type === 'correct');

    if (state.wordIndex === state.words.length || lastWordCorrect) {
      dispatch({ type: 'RESULT' });
      onUpdateTypingFocus(false);
    }
  }, [mode, state.words, state.charIndex, state.wordIndex, raceMode]);

  useEffect(() => {
    if (raceMode) return;

    if (mode === 'time') {
      if ((state.wordIndex + 1) % 10 === 0) {
        dispatch({
          type: 'ADD_WORDS',
          payload: getRandomWords(10, punctuation, numbers),
        });
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
      onUpdateTypingFocus(false);
    }
  }, [timeCountdown, time]);

  useEffect(() => {
    if (state.result.showResults) {
      onTestComplete(state.result);

      if (onResult) {
        onResult(state.result);
        onTypingEnded();
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
                counter={
                  mode === 'time' && !raceMode ? timeCountdown : state.wordIndex
                }
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
