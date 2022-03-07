import Letter from './Letter';
import 'styles/Typing/Word.scss';

interface Props {
  word: {
    letter: string;
    state: 'correct' | 'incorrect' | 'none';
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
          state={letter.state}
          isCurrentLetter={isCurrentWord && index === currentLetter}
        />
      ))}
    </div>
  );
};

export default Word;
