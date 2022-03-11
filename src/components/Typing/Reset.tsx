import { ReactComponent as IconRefresh } from 'assets/images/refresh.svg';
import { TextOnHover } from 'components/UI';
import 'styles/Typing/Reset.scss';

interface Props {
  reset: () => void;
}

const Reset = ({ reset }: Props) => {
  return (
    <TextOnHover text="Restart" classNameWrapper="reset">
      <button className="reset__button" onClick={reset}>
        <IconRefresh />
      </button>
    </TextOnHover>
  );
};

export default Reset;
