import { Logo } from 'components/UI';
import Settings from './Settings';
import 'styles/Header/Header.scss';

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <Settings />
    </header>
  );
};

export default Header;
