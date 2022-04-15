import { useContext } from 'react';
import { TypingContext } from 'context';
import styles from 'styles/Typing/TypingCaret.module.scss';

interface Props {
  position: {
    x: number;
    y: number;
  };
}

const TypingCaret = ({ position }: Props) => {
  const {
    state: { typingStarted },
  } = useContext(TypingContext);

  return (
    <div
      className={`${styles.caret} ${!typingStarted ? styles.animate : ''}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    />
  );
};

export default TypingCaret;
