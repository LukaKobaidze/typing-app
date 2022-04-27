import { useContext } from 'react';
import { GlobalContext } from 'context';
import styles from 'styles/Typing/TypingCaret.module.scss';

interface Props {
  position: {
    x: number;
    y: number;
  };
}

const TypingCaret = ({ position }: Props) => {
  const { typingStarted } = useContext(GlobalContext);

  return (
    <div
      className={`${styles.caret} ${!typingStarted ? styles.animate : ''}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    />
  );
};

export default TypingCaret;
