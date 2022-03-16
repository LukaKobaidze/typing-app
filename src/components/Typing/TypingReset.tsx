import { useContext, useRef } from 'react';
import TypingContext from 'context/typing-context';
import { ReactComponent as IconRefresh } from 'assets/images/refresh.svg';
import { TextOnHover } from 'components/UI';
import 'styles/Typing/TypingReset.scss';

const TypingReset = () => {
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
      <TextOnHover text="Restart" classNameWrapper="typing-reset">
        <button
          className="typing-reset__button"
          ref={resetRef}
          onClick={resetHandler}
        >
          <IconRefresh className="typing-reset__icon" />
        </button>
      </TextOnHover>
    </>
  );
};

export default TypingReset;
