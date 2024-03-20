import { useContext, useEffect, useRef, useState } from 'react';
import { TypingContext } from '@/context/typing.context';
import { TypingWords } from './types';
import Caret from './Caret';
import styles from '@/styles/Typing/Input.module.scss';
import { ProfileContext } from '@/context/profile.context';

interface Props {
  words: TypingWords;
  wordIndex: number;
  charIndex: number;

  /* Used for the Race (1v1) mode */
  secondCaret?: { wordIndex: number; charIndex: number };
}

export default function Input(props: Props) {
  const { words, wordIndex, charIndex, secondCaret } = props;

  const { typingStarted, typingFocused, lineHeight, setLineHeight } =
    useContext(TypingContext);
  const { profile } = useContext(ProfileContext);
  const [wordsOffset, setWordsOffset] = useState(0);

  const wordWrapperRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>();
  const charRef = useRef<HTMLSpanElement>();
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const secondCaretWordRef = useRef<HTMLDivElement>();
  const secondCaretCharRef = useRef<HTMLSpanElement>();

  useEffect(() => {
    if (typingStarted) hiddenInputRef.current?.focus();
  }, [typingStarted]);

  useEffect(() => {
    if (!wordWrapperRef.current) return;
    const { offsetTop, clientHeight } = wordWrapperRef.current;
    setWordsOffset(Math.max(offsetTop - clientHeight, 0));
  }, [charIndex]);

  const firstWord = words[0]?.chars.join('');

  useEffect(() => {
    setLineHeight((state) => wordWrapperRef.current?.clientHeight || state);

    const interval = setInterval(function () {
      setLineHeight((state) => {
        if (state === 0 || wordWrapperRef.current?.clientHeight !== state) {
          return wordWrapperRef.current?.clientHeight || state;
        }

        clearInterval(interval);
        return state;
      });
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [profile.customize.fontSize]);

  return (
    <div className={styles.wrapper} style={{ height: lineHeight * 3 }}>
      {words.length !== 0 && profile.customize.caretStyle !== 'off' && (
        <Caret
          lineHeight={lineHeight}
          wordIndex={wordIndex}
          charIndex={charIndex}
          wordsOffset={wordsOffset}
          firstWord={firstWord}
          wordRef={wordRef}
          charRef={charRef}
        />
      )}

      {typingStarted && secondCaret && (
        <Caret
          lineHeight={lineHeight}
          wordIndex={secondCaret.wordIndex}
          charIndex={secondCaret.charIndex}
          wordRef={secondCaretWordRef}
          charRef={secondCaretCharRef}
          firstWord={firstWord}
          wordsOffset={wordsOffset}
          className={styles.secondCaret}
        />
      )}

      <input
        type="text"
        className={`${styles['hidden-input']} ${
          typingFocused ? styles['hidden-input--nocursor'] : ''
        }`}
        autoCapitalize="off"
        ref={hiddenInputRef}
        tabIndex={-1}
      />
      <div
        className={styles.words}
        style={{
          transform:
            secondCaret || typingStarted
              ? `translateY(-${wordsOffset}px)`
              : undefined,
          fontSize: profile.customize.fontSize,
        }}
      >
        {words.map((word, index) => {
          const isCurrentWord = index === wordIndex;
          const isSecondCaretWord = secondCaret && index === secondCaret.wordIndex;

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
                ref={(node) => {
                  if (isCurrentWord) wordRef.current = node || undefined;
                  if (isSecondCaretWord)
                    secondCaretWordRef.current = node || undefined;
                }}
              >
                {word.chars.map((char, index) => (
                  <span
                    key={index}
                    className={`${styles.char} ${
                      char.type !== 'none' ? styles[`char--${char.type}`] : ''
                    }`}
                    ref={(node) => {
                      if (isCurrentWord && index === charIndex) {
                        charRef.current = node || undefined;
                      }
                      if (isSecondCaretWord && index === secondCaret.charIndex) {
                        secondCaretCharRef.current = node || undefined;
                      }
                    }}
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
