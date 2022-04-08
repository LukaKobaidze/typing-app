import { useContext } from 'react';
import { TypingContext } from 'context';
import Links from 'components/Links';
import PreviousResults from 'components/PreviousResults';
import styles from 'styles/layouts/Footer.module.scss';

const Footer = () => {
  const {
    state: { typingStarted },
  } = useContext(TypingContext);

  return (
    <footer className={`${styles.footer} ${typingStarted ? 'hide' : ''}`}>
      <Links />
      <PreviousResults />
    </footer>
  );
};

export default Footer;
