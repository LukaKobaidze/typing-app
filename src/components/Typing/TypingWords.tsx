import { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from 'context';
import { TypingWords as TypingWordsType } from 'types/typing.type';
import TypingCaret from './TypingCaret';
import styles from 'styles/Typing/TypingWords.module.scss';

interface Props {
  words: TypingWordsType;
  wordIndex: number;
  letterIndex: number;
}

const TypingWords = ({ words, wordIndex, letterIndex }: Props) => {
  const { typingStarted } = useContext(GlobalContext);
  const wordRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLSpanElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [wordsOffset, setWordsOffset] = useState(0);
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
  }, [wordIndex, letterIndex, wordsOffset]);

  useEffect(() => {
    if (!wordRef.current) return;
    const { offsetTop, clientHeight } = wordRef.current;

    setWordsOffset(Math.max(offsetTop! - clientHeight! - clientHeight! / 2, 0));
  }, [letterIndex]);

  useEffect(() => {
    if (typingStarted) {
      setTimeout(() => {
        hiddenInputRef.current?.focus();
      }, 1);
    }
  }, [typingStarted]);

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
          typingStarted ? { transform: `translateY(-${wordsOffset}px)` } : {}
        }
      >
        {words.map((word, index) => {
          const isCurrentWord = index === wordIndex;
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
                    isCurrentWord && index === letterIndex
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
