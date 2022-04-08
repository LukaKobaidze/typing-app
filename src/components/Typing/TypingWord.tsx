import { useContext } from 'react';
import { TypingContext } from 'context';
import { TypingLetterType } from 'shared/types';
import styles from 'styles/Typing/TypingWord.module.scss';

interface Props {
  word: {
    letter: string;
    type: TypingLetterType;
  }[];
  isCurrentWord: boolean;
  wordRef?: React.RefObject<HTMLDivElement>;
  style?: React.CSSProperties;
}

const TypingWord = ({ word, isCurrentWord, wordRef, style }: Props) => {
  const {
    state: { letterIndex },
  } = useContext(TypingContext);

  return (
    <div
      className={`${styles.word} ${
        isCurrentWord && letterIndex > word.length - 1 ? styles.active : ''
      }`}
      style={style}
      ref={wordRef}
    >
      {word.map((letter, index) => (
        <span
          key={index}
          className={`${styles.letter} ${
            letter.type !== 'none' ? styles[`letter--${letter.type}`] : ''
          } ${isCurrentWord && index === letterIndex ? styles.active : ''}`}
        >
          {letter.letter}
        </span>
      ))}
    </div>
  );
};

export default TypingWord;
