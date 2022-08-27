import { useContext } from 'react';
import { GlobalContext } from 'context/global-context';
import { ReactComponent as IconGithub } from 'assets/images/github.svg';
import { Logo, TextOnHover } from './UI';
import Settings from './Settings';
import Typing from './Typing';
import styles from 'styles/App.module.scss';

const App = () => {
  const { typingStarted } = useContext(GlobalContext);

  return (
    <>
      <header className={styles.header}>
        <Logo colored={!typingStarted} />
        <Settings className={typingStarted ? 'hide' : ''} />
      </header>

      <main>
        <Typing />
      </main>

      <footer className={`${styles.footer} ${typingStarted ? 'hide' : ''}`}>
        <div className={styles.links}>
          <TextOnHover text="repository" position="top">
            <a
              href="https://github.com/LukaKobaidze/typing-app"
              rel="noreferrer"
              target="_blank"
              className="links-item__link"
            >
              <IconGithub />
            </a>
          </TextOnHover>
        </div>
      </footer>
    </>
  );
};

export default App;
