import { useContext } from 'react';
import { TypingContext } from 'context';
import { Logo } from 'components/UI';
import Settings from 'components/Settings';
import Typing from 'components/Typing';
import Links from 'components/Links';
import PreviousResults from 'components/PreviousResults';
import styles from 'styles/App.module.scss';

const App = () => {
  const {
    state: { typingStarted },
  } = useContext(TypingContext);

  const typingStartedClass = typingStarted ? styles.hide : '';
  return (
    <>
      <header className={styles.header}>
        <Logo colored={!typingStarted} />
        <Settings className={typingStartedClass} />
      </header>
      <main className={styles.main}>
        <Typing />
      </main>
      <footer className={`${styles.footer} ${typingStartedClass}`}>
        <Links />
        <PreviousResults />
      </footer>
    </>
  );
};

export default App;
