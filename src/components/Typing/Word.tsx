import Letter from './Letter';
import 'styles/Typing/Word.scss';
import { TypingLetterType } from 'shared/types/typing.type';

interface Props {
  word: {
    letter: string;
    type: TypingLetterType;
  }[];
  isCurrentWord: boolean;
  currentLetter: number;
}

const Word = ({ word, isCurrentWord, currentLetter }: Props) => {
  return (
    <div
      className={`word ${
        isCurrentWord && currentLetter > word.length - 1 ? 'active' : ''
      }`}
    >
      {word.map((letter, index) => (
        <Letter
          key={index}
          letter={letter.letter}
          type={letter.type}
          isCurrentLetter={isCurrentWord && index === currentLetter}
        />
      ))}
    </div>
  );
};

export default Word;
