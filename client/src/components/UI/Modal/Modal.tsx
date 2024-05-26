import { useEffect } from 'react';
import FocusTrap from 'focus-trap-react';
import { IconClose } from '@/assets/image';
import { AlertOutsideClick, Tooltip } from '@/components/UI';
import styles from './Modal.module.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  ignoreKeyboardEscape?: boolean;
  initialFocus?: boolean;
  heading?: string;
  HeadingIcon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  ignoreOutsideClick?: boolean;
}

export default function Modal(props: Props) {
  const {
    onClose,
    ignoreKeyboardEscape,
    initialFocus,
    heading,
    HeadingIcon,
    ignoreOutsideClick,
    className,
    children,
    ...restProps
  } = props;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
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
  }, [ignoreKeyboardEscape, onClose]);

  return (
    <FocusTrap
      focusTrapOptions={initialFocus === false ? { initialFocus } : undefined}
    >
      <div className={styles['wrapper-backdrop']}>
        <AlertOutsideClick
          event="mousedown"
          onOutsideClick={onClose}
          className={`${styles.modal} ${className}`}
          id="modal"
          handleWhen={!ignoreOutsideClick}
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
                onClick={onClose}
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
