import { ReactComponent as IconRefresh } from 'assets/images/refresh.svg';
import { TextOnHover } from 'components/UI';
import 'styles/Typing/Reset.scss';

const Reset = () => {
  return (
    <TextOnHover text="Restart" classNameWrapper="reset">
      <button className="reset__button">
        <IconRefresh />
      </button>
    </TextOnHover>
  );
};

export default Reset;
