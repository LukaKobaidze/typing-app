import { useContext } from 'react';
import { GlobalContext } from 'context/global-context';
import { IconRedirect, IconGithub } from 'assets';
import { Logo, TextOnHover } from 'components/UI';
import Settings from 'components/Settings';
import Typing from 'components/Typing';
import styles from 'styles/App.module.scss';

export default function App() {
  const { typingStarted } = useContext(GlobalContext);

  return (
    <>
      <header className={styles.header}>
        <Logo colored={!typingStarted} />
        <Settings className={typingStarted ? 'hide' : ''} hidden={typingStarted} />
      </header>

      <main>
        <Typing />
      </main>

      <footer className={`${styles.footer} ${typingStarted ? 'hide' : ''}`}>
        <div className={styles.links}>
          <TextOnHover
            text={
              <div className={styles['github-hover-wrapper']}>
                <p>repository</p>
                <IconRedirect className={styles['github-hover-wrapper__icon']} />
              </div>
            }
            position="top"
          >
            <a
              href="https://github.com/LukaKobaidze/typing-app"
              rel="noreferrer"
              target="_blank"
              className="links-item__link"
              tabIndex={typingStarted ? -1 : undefined}
            >
              <IconGithub />
            </a>
          </TextOnHover>
        </div>
      </footer>
    </>
  );
}
