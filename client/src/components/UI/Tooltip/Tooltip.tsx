import styles from './Tooltip.module.scss';

interface Props {
  text: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  show?: boolean;
  showOnHover?: boolean;
  offset?: number;
  width?: number;
  className?: string;
  style?: React.CSSProperties;
  classNamePopup?: string;
  backgroundColor?: string;
  pointerEvents?: boolean;
  children?: React.ReactNode;
}

export default function Tooltip(props: Props) {
  const {
    text,
    position = 'bottom',
    show,
    showOnHover,
    offset = 6,
    width = 'auto',
    className,
    style,
    classNamePopup,
    backgroundColor,
    pointerEvents,
    children,
  } = props;

  const textStyle = {
    '--offset': `${offset}px`,
    backgroundColor: backgroundColor,
    width,
  } as React.CSSProperties;

  return (
    <div
      className={`${styles.wrapper} ${showOnHover ? styles['wrapper--hover'] : ''} ${
        show ? styles['wrapper--show'] : ''
      } ${className}`}
      style={style}
    >
      {children}

      <div
        className={`${styles.text} ${styles[`text--${position}`]} ${
          pointerEvents ? styles.pointerEvents : ''
        } ${classNamePopup}`}
        style={textStyle}
      >
        {text}
      </div>
    </div>
  );
}
