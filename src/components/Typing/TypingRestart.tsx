import { useContext, useRef } from 'react';
import { GlobalContext } from 'context/global-context';
import { ReactComponent as IconRefresh } from 'assets/images/refresh.svg';
import { ButtonRounded, TextOnHover } from 'components/UI';
import styles from 'styles/Typing/TypingRestart.module.scss';

type Props = {
  onRestart: () => void;
  className?: string;
};

const TypingRestart = ({ onRestart, className }: Props) => {
  const { onTypingEnd } = useContext(GlobalContext);
  const divRef = useRef<HTMLDivElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);

  const resetHandler = () => {
    onRestart();
    onTypingEnd();
    divRef.current?.focus();
    resetRef.current?.blur();
  };

  return (
    <>
      <TextOnHover
        text="Restart"
        classNameWrapper={`${styles.restart} ${className}`}
      >
        <ButtonRounded ref={resetRef} onClick={resetHandler}>
          <IconRefresh className={styles.icon} />
        </ButtonRounded>
      </TextOnHover>
    </>
  );
};

export default TypingRestart;
