import styles from 'styles/UI/TextOnHover.module.scss';

interface Props {
  text: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactNode;
  classNameWrapper?: string;
  className?: string;
}

const TextOnHover = (props: Props) => {
  const {
    text,
    position = 'bottom',
    children,
    classNameWrapper,
    className,
  } = props;

  return (
    <div
      className={`${styles.container} ${
        styles[`container--${position}`]
      } ${classNameWrapper}`}
    >
      {children}
      <div className={`${styles['container__text']} ${className}`}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default TextOnHover;
