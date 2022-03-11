import { ReactComponent as IconGithub } from 'assets/images/github.svg';
import { TextOnHover } from 'components/UI';
import 'styles/Footer/Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <TextOnHover text="GitHub">
        <a
          href="https://github.com/LukaKobaidze/typing-app"
          rel="noreferrer"
          target="_blank"
        >
          <IconGithub className="footer__icon" />
        </a>
      </TextOnHover>
    </footer>
  );
};

export default Footer;
