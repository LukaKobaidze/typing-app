import 'styles/Typing/Letter.scss';

interface Props {
  letter: string;
  state: 'correct' | 'incorrect' | 'none';
  isCurrentLetter: boolean;
}

const Letter = ({ letter, state, isCurrentLetter }: Props) => {
  return (
    <span
      className={`letter ${isCurrentLetter ? 'letter--active' : ''} ${
        state !== 'none' ? `letter--${state}` : ''
      }`}
    >
      {letter}
    </span>
  );
};

export default Letter;
