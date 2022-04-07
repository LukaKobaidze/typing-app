import styles from 'styles/Typing/TypingTimer.module.scss';

interface Props {
  seconds: number;
}

const TypingTimer = ({ seconds }: Props) => {
  const calcMinutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const calcSeconds = String(seconds % 60).padStart(2, '0');

  return (
    <div
      className={`${styles.timer} ${seconds <= 5 ? styles['timer--red'] : ''}`}
    >
      <p>{!+calcMinutes ? calcSeconds : `${calcMinutes}:${calcSeconds}`}</p>
    </div>
  );
};

export default TypingTimer;
