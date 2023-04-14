import { ReactComponent as IconKeyboard } from 'assets/images/keyboard.svg';
import styles from 'styles/UI/Logo.module.scss';

interface Props {
  colored: boolean;
}

export default function Logo(props: Props) {
  const { colored } = props;

  return (
    <div
      className={`${styles.logo} ${
        styles[`logo--${colored ? 'color' : 'nocolor'}`]
      }`}
    >
      <IconKeyboard className={styles.icon} />
      <div className={styles['text-div']}>
        <span className={styles['text-div__title']}>Typing app</span>
        <span className={styles['text-div__subtitle']}>Test your typing speed</span>
      </div>
    </div>
  );
}
