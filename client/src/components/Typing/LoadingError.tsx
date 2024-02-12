import { useContext, Fragment } from 'react';
import { TypemodeContext } from '@/context/typemode.context';
import { data } from '@/data';
import { ButtonRounded, Tooltip } from '@/components/UI';
import styles from '@/styles/Typing/LoadingError.module.scss';
import { IconRedirect } from '@/assets/image';

interface Props {}

export default function LoadingError(props: Props) {
  const { mode, onMode } = useContext(TypemodeContext);

  return (
    <div className={styles.container}>
      <p>
        Failed to load{' '}
        {mode === 'quote' ? (
          <>
            quotes from an{' '}
            <div className={styles.apiTooltipContainer}>
              <Tooltip
                text={
                  <div className={styles.apiTooltipText}>
                    <span>quotable API</span>
                    <IconRedirect className={styles.apiTooltipTextIcon} />
                  </div>
                }
                position="top"
                showOnHover
              >
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://github.com/lukePeavey/quotable"
                  className={styles.apiLink}
                >
                  API
                </a>
              </Tooltip>
            </div>
          </>
        ) : (
          'random words'
        )}
        . Try again later.
      </p>
      <p className={styles.textTryOther}>For now you can try other type modes</p>
      <div className={styles.otherTypemodes}>
        {Object.keys(data.typemode).map((mapMode) =>
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
