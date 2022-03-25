import { TypingLetterType } from 'shared/types';
import styles from 'styles/Typing/TypingLetter.module.scss';

interface Props {
  letter: string;
  type: TypingLetterType;
  isCurrentLetter: boolean;
}

const TypingLetter = ({ letter, type, isCurrentLetter }: Props) => {
  return (
    <span
      className={`${styles.letter} ${
        type !== 'none' ? styles[`letter--${type}`] : ''
      } ${isCurrentLetter ? styles.active : ''}`}
    >
      {letter}
    </span>
  );
};

export default TypingLetter;
