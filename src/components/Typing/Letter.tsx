import 'styles/Typing/Letter.scss';

interface Props {
  letter: string;
  state: 'correct' | 'incorrect' | 'none';
  isCurrentLetter: boolean;
}

const Letter = ({ letter, state, isCurrentLetter }: Props) => {
  return (
    <span
      className={`letter ${state !== 'none' ? `letter--${state}` : ''} ${
        isCurrentLetter ? 'active' : ''
      }`}
    >
      {letter}
    </span>
  );
};

export default Letter;
