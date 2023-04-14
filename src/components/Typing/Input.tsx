import { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from 'context/global-context';
import { TypingWords } from './types';
import styles from 'styles/Typing/Input.module.scss';

interface Props {
  words: TypingWords;
  wordIndex: number;
  charIndex: number;
}

export default function Input(props: Props) {
  const { words, wordIndex, charIndex } = props;
  
  const { typingStarted } = useContext(GlobalContext);
  const [caretPos, setCaretPos] = useState({ x: 0, y: 0 });
  const [wordsOffset, setWordsOffset] = useState(0);

  const wordWrapperRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const charRef = useRef<HTMLSpanElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typingStarted) hiddenInputRef.current?.focus();
  }, [typingStarted]);

  const firstWord = words[0]?.chars.join('');
  useEffect(() => {
    if (!wordRef.current) return;
    const {
      offsetLeft: wordOffsetLeft,
      offsetTop: wordOffsetTop,
      offsetWidth: wordOffsetWidth,
    } = wordRef.current;

    if (!charRef.current) {
      return setCaretPos({
        x: wordOffsetLeft + wordOffsetWidth,
        y: wordOffsetTop - wordsOffset,
      });
    }

    const { offsetLeft: charOffsetLeft } = charRef.current;
    setCaretPos({
      x: wordOffsetLeft + charOffsetLeft,
      y: wordOffsetTop - wordsOffset,
    });
  }, [wordIndex, charIndex, wordsOffset, firstWord]);

  useEffect(() => {
    if (!wordWrapperRef.current) return;
    const { offsetTop, clientHeight } = wordWrapperRef.current;
    setWordsOffset(Math.max(offsetTop - clientHeight, 0));
  }, [charIndex]);

  return (
    <div className={styles.wrapper}>
      {/* Caret */}
      {words.length !== 0 && (
        <div
          className={`${styles.caret} ${!typingStarted ? styles.animate : ''}`}
          style={{ transform: `translate(${caretPos.x}px, ${caretPos.y}px)` }}
        />
      )}

      <input
        type="text"
        className={styles['hidden-input']}
        autoCapitalize="off"
        ref={hiddenInputRef}
        tabIndex={-1}
      />
      <div
        className={styles.words}
        style={typingStarted ? { transform: `translateY(-${wordsOffset}px)` } : {}}
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
                {word.chars.map((char, index) => (
                  <span
                    key={index}
                    className={`${styles.char} ${
                      char.type !== 'none' ? styles[`char--${char.type}`] : ''
                    }`}
                    ref={isCurrentWord && index === charIndex ? charRef : undefined}
                  >
                    {char.content}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
