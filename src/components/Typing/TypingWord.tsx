import { TypingLetterType } from 'shared/types';
import TypingLetter from './TypingLetter';
import styles from 'styles/Typing/TypingWord.module.scss';
import { useContext } from 'react';
import { TypingContext } from 'context';

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
        isCurrentWord && letterIndex > word.length - 1 && styles.active
      }`}
      style={style}
      ref={wordRef}
    >
      {word.map((letter, index) => (
        <TypingLetter
          key={index}
          letter={letter.letter}
          type={letter.type}
          isCurrentLetter={isCurrentWord && index === letterIndex}
        />
      ))}
    </div>
  );
};

export default TypingWord;
