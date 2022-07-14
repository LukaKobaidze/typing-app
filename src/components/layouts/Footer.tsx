import { ReactComponent as IconGithub } from 'assets/images/github.svg';
import { useContext } from 'react';
import { GlobalContext } from 'context';
import styles from 'styles/layouts/Footer.module.scss';
import { TextOnHover } from 'components/UI';

const Footer = () => {
  const { typingStarted } = useContext(GlobalContext);

  return (
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
  );
};

export default Footer;
