import { useContext, Fragment } from 'react';
import { TypemodeContext } from '@/context/typemode.context';
import { ModalContext } from '@/context/modal.context';
import { data } from '@/data';
import { IconRedirect, IconTags } from '@/assets/image';
import { ButtonRounded, Tooltip } from '@/components/UI';
import styles from './LoadingError.module.scss';

interface Props {
  status: 404 | 500;
}

export default function LoadingError({ status }: Props) {
  const { mode, quote, onMode } = useContext(TypemodeContext);
  const { onOpenModal } = useContext(ModalContext);

  return (
    <div className={styles.container}>
      {status === 500 ? (
        <>
          <div>
            Failed to load quotes from a{' '}
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
                  third-party API
                </a>
              </Tooltip>
            </div>
            . Try again later.
          </div>
          <p className={styles.textSecondary}>
            For now you can try other type modes
          </p>
          <div className={styles.buttonsWrapper}>
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
        </>
      ) : (
        <>
          <div className={styles.quoteNotFound}>
            <p>
              Couldn't find a {quote !== 'all' && quote} quote with selected tags.
            </p>
            <p className={styles.textSecondary}>
              Try changing quote length to <span className="bold">'all'</span> or
              update quote tags.
            </p>

            <div className={styles.buttonsWrapper}>
              <ButtonRounded
                variant="2"
                className={styles.typemodeButton}
                onClick={() => onOpenModal({ modal: 'quoteTags' })}
              >
                <IconTags className={styles.typemodeButtonIcon} />
                <span>Update Tags</span>
              </ButtonRounded>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
