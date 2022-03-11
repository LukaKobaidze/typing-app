import { ReactComponent as IconKeyboard } from 'assets/images/keyboard.svg';
import 'styles/UI/Logo.scss';

interface Props {
  theme?: 'light' | 'dark'; // 'dark' by default
}

const Logo = ({ theme = 'dark' }: Props) => {
  return (
    <div className={`logo logo--${theme}`}>
      <IconKeyboard className="logo__icon" />
      <div className="logo__text-div">
        <span className="logo__text-div__title">Typing app</span>
        <span className="logo__text-div__subtitle">Test your typing speed</span>
      </div>
    </div>
  );
};

export default Logo;
