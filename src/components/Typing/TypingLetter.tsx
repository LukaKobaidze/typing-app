import { TypingLetterType } from 'shared/types';
import 'styles/Typing/TypingLetter.scss';

interface Props {
  letter: string;
  type: TypingLetterType;
  isCurrentLetter: boolean;
}

const TypingLetter = ({ letter, type, isCurrentLetter }: Props) => {
  return (
    <span
      className={`typing-letter ${
        type !== 'none' ? `typing-letter--${type}` : ''
      } ${isCurrentLetter ? 'active' : ''}`}
    >
      {letter}
    </span>
  );
};

export default TypingLetter;
