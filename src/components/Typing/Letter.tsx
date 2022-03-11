import { TypingLetterType } from 'shared/types/typing.type';
import 'styles/Typing/Letter.scss';

interface Props {
  letter: string;
  type: TypingLetterType;
  isCurrentLetter: boolean;
}

const Letter = ({ letter, type, isCurrentLetter }: Props) => {
  return (
    <span
      className={`letter ${type !== 'none' ? `letter--${type}` : ''} ${
        isCurrentLetter ? 'active' : ''
      }`}
    >
      {letter}
    </span>
  );
};

export default Letter;
