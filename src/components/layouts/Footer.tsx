import { useContext } from 'react';
import { GlobalContext } from 'context';
import Links from '../Links';
import styles from 'styles/layouts/Footer.module.scss';

const Footer = () => {
  const { typingStarted } = useContext(GlobalContext);

  return (
    <footer className={`${styles.footer} ${typingStarted ? 'hide' : ''}`}>
      <Links />
    </footer>
  );
};

export default Footer;
