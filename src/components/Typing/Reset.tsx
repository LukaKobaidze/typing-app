import { useContext, useRef } from 'react';
import TypingContext from 'context/typing-context';
import { ReactComponent as IconRefresh } from 'assets/images/refresh.svg';
import { TextOnHover } from 'components/UI';
import 'styles/Typing/Reset.scss';

const Reset = () => {
  const { dispatch } = useContext(TypingContext);
  const divRef = useRef<HTMLDivElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);

  const resetHandler = () => {
    dispatch({ type: 'RESET' });
    divRef.current?.focus();
    resetRef.current?.blur();
  };

  return (
    <>
      <div tabIndex={-1} ref={divRef} />
      <TextOnHover text="Restart" classNameWrapper="reset">
        <button className="reset__button" ref={resetRef} onClick={resetHandler}>
          <IconRefresh className="reset__icon" />
        </button>
      </TextOnHover>
    </>
  );
};

export default Reset;
