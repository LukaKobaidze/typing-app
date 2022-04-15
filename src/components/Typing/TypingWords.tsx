import { useContext, useEffect, useRef, useState } from 'react';
import { TypingContext } from 'context';
import TypingCaret from './TypingCaret';
import styles from 'styles/Typing/TypingWords.module.scss';

const TypingWords = () => {
  const { state } = useContext(TypingContext);
  const wordRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLSpanElement>(null);
  const [wordsOffset, setWordsOffset] = useState(0);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [caretPos, setCaretPos] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    if (state.typingStarted) {
      hiddenInputRef.current?.focus();
    } else {
      hiddenInputRef.current?.blur();
    }
  }, [state.typingStarted]);

  return (
    <div className={styles.wrapper}>
      <TypingCaret position={caretPos} />
      <input
        type="text"
        className={styles['hidden-input']}
        autoCapitalize="off"
        ref={hiddenInputRef}
      />
      <div
        className={styles.words}
        style={
          state.typingStarted
            ? { transform: `translateY(-${wordsOffset}px)` }
            : {}
        }
      >
        {state.words.map((word, index) => {
          const isCurrentWord = index === state.wordIndex;
          return (
            <div
              key={index}
              className={styles.word}
              ref={isCurrentWord ? wordRef : undefined}
            >
              {word.map((letter, index) => (
                <span
                  key={index}
                  className={`${styles.letter} ${
                    letter.type !== 'none'
                      ? styles[`letter--${letter.type}`]
                      : ''
                  }`}
                  ref={
                    isCurrentWord && index === state.letterIndex
                      ? letterRef
                      : undefined
                  }
                >
                  {letter.letter}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TypingWords;
