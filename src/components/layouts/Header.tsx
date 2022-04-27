import { useContext } from 'react';
import { GlobalContext } from 'context';
import { Logo } from '../UI';
import Settings from '../Settings';
import styles from 'styles/layouts/Header.module.scss';

const Header = () => {
  const { typingStarted } = useContext(GlobalContext);

  return (
    <header className={styles.header}>
      <Logo colored={!typingStarted} />
      <Settings className={typingStarted ? 'hide' : ''} />
    </header>
  );
};

export default Header;
