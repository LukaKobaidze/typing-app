import { ReactComponent as IconGithub } from 'assets/images/github.svg';
import { TextOnHover } from 'components/UI';
import 'styles/Footer/Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <a
        href="https://github.com/LukaKobaidze/typing-app"
        rel="noreferrer"
        target="_blank"
      >
        <TextOnHover text="GitHub">
          <IconGithub className="footer__icon" />
        </TextOnHover>
      </a>
    </footer>
  );
};

export default Footer;
