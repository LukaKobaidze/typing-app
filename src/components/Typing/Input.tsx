import { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from 'context/global-context';
import { TypingWords } from './types';
import Caret from './Caret';
import styles from 'styles/Typing/Input.module.scss';

interface Props {
  words: TypingWords;
  wordIndex: number;
  charIndex: number;
  cursorHidden: boolean;
}

export default function Input(props: Props) {
  const { words, wordIndex, charIndex, cursorHidden } = props;

  const { typingStarted } = useContext(GlobalContext);
  const [wordsOffset, setWordsOffset] = useState(0);

  const wordWrapperRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const charRef = useRef<HTMLSpanElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typingStarted) hiddenInputRef.current?.focus();
  }, [typingStarted]);

  useEffect(() => {
    if (!wordWrapperRef.current) return;
    const { offsetTop, clientHeight } = wordWrapperRef.current;
    setWordsOffset(Math.max(offsetTop - clientHeight, 0));
  }, [charIndex]);

  const firstWord = words[0]?.chars.join('');

  return (
    <div className={styles.wrapper}>
      {words.length !== 0 && (
        <Caret
          wordIndex={wordIndex}
          charIndex={charIndex}
          wordsOffset={wordsOffset}
          firstWord={firstWord}
          wordRef={wordRef}
          charRef={charRef}
        />
      )}

      <input
        type="text"
        className={`${styles['hidden-input']} ${
          cursorHidden ? styles['hidden-input--nocursor'] : ''
        }`}
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
