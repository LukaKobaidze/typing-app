import { useContext } from 'react';
import { TypingContext } from 'context';
import { Logo } from 'components/UI';
import Settings from 'components/Settings';
import styles from 'styles/layouts/Header.module.scss';

const Header = () => {
  const {
    state: { typingStarted },
  } = useContext(TypingContext);

  return (
    <header className={styles.header}>
      <Logo colored={!typingStarted} />
      <Settings className={typingStarted ? 'hide' : ''} />
    </header>
  );
};

export default Header;
