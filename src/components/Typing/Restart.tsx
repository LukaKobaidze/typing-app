import { useContext, useRef } from 'react';
import { GlobalContext } from 'context/global-context';
import { ReactComponent as IconRefresh } from 'assets/images/refresh.svg';
import { ButtonRounded, TextOnHover } from 'components/UI';
import styles from 'styles/Typing/Restart.module.scss';

interface Props {
  onRestart: () => void;
  className?: string;
}

export default function Restart(props: Props) {
  const { onRestart, className } = props;

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
      <div ref={divRef} tabIndex={-1} />
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
}
