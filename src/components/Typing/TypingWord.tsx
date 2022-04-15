import { useContext } from 'react';
import { TypingContext } from 'context';
import { TypingLetterType } from 'shared/types';
import styles from 'styles/Typing/TypingWord.module.scss';

interface Props {
  word: {
    letter: string;
    type: TypingLetterType;
  }[];
  wordRef: React.RefObject<HTMLDivElement> | undefined;
  letterRef: React.RefObject<HTMLSpanElement> | undefined;
}

const TypingWord = ({ word, wordRef, letterRef }: Props) => {
  const {
    state: { letterIndex },
  } = useContext(TypingContext);

  return (
    <div className={styles.word} ref={wordRef}>
      {word.map((letter, index) => (
        <span
          key={index}
          className={`${styles.letter} ${
            letter.type !== 'none' ? styles[`letter--${letter.type}`] : ''
          }`}
          ref={index === letterIndex ? letterRef : undefined}
        >
          {letter.letter}
        </span>
      ))}
    </div>
  );
};

export default TypingWord;
