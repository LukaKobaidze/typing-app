import { ReactComponent as IconKeyboard } from 'assets/images/keyboard.svg';
import 'styles/UI/Logo.scss';

interface Props {
  colored: boolean;
}

const Logo = ({ colored }: Props) => {
  return (
    <div className={`logo logo--${colored ? 'color' : 'nocolor'}`}>
      <IconKeyboard className="logo__icon" />
      <div className="logo__text-div">
        <span className="logo__text-div__title">Typing app</span>
        <span className="logo__text-div__subtitle">Test your typing speed</span>
      </div>
    </div>
  );
};

export default Logo;
