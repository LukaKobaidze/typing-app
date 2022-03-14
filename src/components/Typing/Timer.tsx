import 'styles/Typing/Timer.scss';

interface Props {
  seconds: number;
}

const Timer = ({ seconds }: Props) => {
  const calcMinutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const calcSeconds = String(seconds % 60).padStart(2, '0');

  return (
    <div className={`timer ${seconds <= 5 ? 'timer--red' : ''}`}>
      <p>
        {calcMinutes}:{calcSeconds}
      </p>
    </div>
  );
};

export default Timer;
