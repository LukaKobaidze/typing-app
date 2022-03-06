import Letter from './Letter';
import 'styles/Typing/Word.scss';

interface Props {
  word: {
    letter: string;
    state: 'correct' | 'incorrect' | 'none';
  }[];
  currentLetter?: number;
}

const Word = ({ word, currentLetter }: Props) => {
  return (
    <div className="word">
      {word.map((letter, index) => (
        <Letter
          key={index}
          letter={letter.letter}
          state={letter.state}
          isCurrentLetter={!!(currentLetter && index === currentLetter)}
        />
      ))}
    </div>
  );
};

export default Word;
