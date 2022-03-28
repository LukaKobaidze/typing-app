import { useContext, useEffect, useRef } from 'react';
import { TypingContext } from 'context';
import { ReactComponent as IconRefresh } from 'assets/images/refresh.svg';
import { TextOnHover } from 'components/UI';
import styles from 'styles/Typing/TypingRestart.module.scss';

const TypingRestart = () => {
  const {
    state: { typingStarted },
    dispatch,
  } = useContext(TypingContext);
  const divRef = useRef<HTMLDivElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typingStarted) {
      divRef.current?.focus();
    }
  }, [typingStarted]);

  const resetHandler = () => {
    dispatch({ type: 'RESET' });
    divRef.current?.focus();
    resetRef.current?.blur();
  };

  return (
    <>
      <div tabIndex={-1} ref={divRef} />
      <TextOnHover text="Restart" classNameWrapper={styles.restart}>
        <button
          className={styles['restart__button']}
          ref={resetRef}
          onClick={resetHandler}
        >
          <IconRefresh className={styles['restart__icon']} />
        </button>
      </TextOnHover>
    </>
  );
};

export default TypingRestart;
