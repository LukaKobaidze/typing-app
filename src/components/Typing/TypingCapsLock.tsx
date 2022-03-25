import { ReactComponent as IconLock } from 'assets/images/lock.svg';
import styles from 'styles/Typing/TypingCapsLock.module.scss';

interface Props {}

const TypingCapsLock = (props: Props) => {
  return (
    <div className={styles.capslock}>
      <IconLock className={styles.icon} />
      <p>CAPS LOCK</p>
    </div>
  );
};

export default TypingCapsLock;
