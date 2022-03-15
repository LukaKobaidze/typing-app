import 'styles/Typing/TypingTimer.scss';

interface Props {
  seconds: number;
}

const TypingTimer = ({ seconds }: Props) => {
  const calcMinutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const calcSeconds = String(seconds % 60).padStart(2, '0');

  return (
    <div className={`typing-timer ${seconds <= 5 ? 'typing-timer--red' : ''}`}>
      <p>
        {calcMinutes}:{calcSeconds}
      </p>
    </div>
  );
};

export default TypingTimer;
