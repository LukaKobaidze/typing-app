import { useEffect } from 'react';
import FocusTrap from 'focus-trap-react';
import { IconClose } from '@/assets/image';
import { AlertOutsideClick, Tooltip } from '@/components/UI';
import styles from '@/styles/UI/Modal.module.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onCloseModal: () => void;
  ignoreKeyboardEscape?: boolean;
  initialFocus?: boolean;
  heading?: string;
  HeadingIcon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}

export default function Modal(props: Props) {
  const {
    onCloseModal,
    ignoreKeyboardEscape,
    initialFocus,
    heading,
    HeadingIcon,
    className,
    children,
    ...restProps
  } = props;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseModal();
      }
    };

    if (ignoreKeyboardEscape) {
      document.removeEventListener('keydown', handleKeyDown);
    } else {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [ignoreKeyboardEscape, onCloseModal]);

  return (
    <FocusTrap
      focusTrapOptions={initialFocus === false ? { initialFocus } : undefined}
    >
      <div className={styles['wrapper-backdrop']}>
        <AlertOutsideClick
          event="mousedown"
          onOutsideClick={onCloseModal}
          className={`${styles.modal} ${className}`}
          id="modal"
          {...restProps}
        >
          <div className={styles.header}>
            {heading && (
              <div className={styles.headingWrapper}>
                {HeadingIcon && (
                  <HeadingIcon className={styles.headingWrapperIcon} />
                )}
                <h2>{heading}</h2>
              </div>
            )}
            <Tooltip text="close" showOnHover>
              <button
                className={styles.buttonClose}
                onClick={onCloseModal}
                aria-label="close"
              >
                <IconClose />
              </button>
            </Tooltip>
          </div>
          {children}
        </AlertOutsideClick>
      </div>
    </FocusTrap>
  );
}
