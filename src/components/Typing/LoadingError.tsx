import { ButtonRounded } from 'components/UI';
import { TypemodeContext, typemodeData } from 'context/typemode.context';
import { useContext, Fragment } from 'react';
import styles from 'styles/Typing/LoadingError.module.scss';

interface Props {}

export default function LoadingError(props: Props) {
  const { mode, onMode } = useContext(TypemodeContext);

  return (
    <div className={styles.container}>
      <p>
        Failed to load {mode === 'quote' ? 'quotes from an API' : 'random words'}.
        Try again later.
      </p>
      <p className={styles.textTryOther}>For now you can try other type modes</p>
      <div className={styles.otherTypemodes}>
        {Object.keys(typemodeData).map((mapMode) =>
          mapMode === mode ? (
            <Fragment key={mapMode} />
          ) : (
            <ButtonRounded
              key={mapMode}
              variant="2"
              className={styles.typemodeButton}
              onClick={() => onMode(mapMode as typeof mode)}
            >
              {mapMode}
            </ButtonRounded>
          )
        )}
      </div>
    </div>
  );
}
