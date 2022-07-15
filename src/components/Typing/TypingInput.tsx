import { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from 'context';
import { TypingWords as TypingWordsType } from 'types/typing.type';
import TypingCaret from './TypingCaret';
import styles from 'styles/Typing/TypingInput.module.scss';

interface Props {
  words: TypingWordsType;
  wordIndex: number;
  letterIndex: number;
}

const TypingInput = ({ words, wordIndex, letterIndex }: Props) => {
  const { typingStarted } = useContext(GlobalContext);
  const wordWrapperRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLSpanElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [wordsOffset, setWordsOffset] = useState(0);
  const [caretPos, setCaretPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typingStarted) hiddenInputRef.current?.focus();
  }, [typingStarted]);

  useEffect(() => {
    if (!wordRef.current) return;
    const {
      offsetLeft: wordOffsetLeft,
      offsetTop: wordOffsetTop,
      offsetWidth: wordOffsetWidth,
    } = wordRef.current;

    if (!letterRef.current) {
      return setCaretPos({
        x: wordOffsetLeft + wordOffsetWidth,
        y: wordOffsetTop - wordsOffset,
      });
    }

    const { offsetLeft: letterOffsetLeft } = letterRef.current;
    setCaretPos({
      x: wordOffsetLeft + letterOffsetLeft,
      y: wordOffsetTop - wordsOffset,
    });
  }, [wordIndex, letterIndex, wordsOffset]);

  useEffect(() => {
    if (!wordWrapperRef.current) return;
    const { offsetTop, clientHeight } = wordWrapperRef.current;
    setWordsOffset(Math.max(offsetTop - clientHeight, 0));
  }, [letterIndex]);

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
              className={styles.wordWrapper}
              ref={isCurrentWord ? wordWrapperRef : undefined}
            >
              <div
                className={`${styles.word} ${
                  word.isIncorrect ? styles.wordIncorrect : ''
                }`}
                ref={isCurrentWord ? wordRef : undefined}
              >
                {word.letters.map((letter, index) => (
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TypingInput;
