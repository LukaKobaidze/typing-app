import styles from 'styles/UI/TextOnHover.module.scss';

interface Props {
  text: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactNode;
  classNameWrapper?: string;
  className?: string;
}

export default function TextOnHover(props: Props) {
  const { text, position = 'bottom', children, classNameWrapper, className } = props;

  return (
    <div
      className={`${styles.container} ${
        styles[`container--${position}`]
      } ${classNameWrapper}`}
    >
      {children}
      <div className={`${styles['container__text']} ${className}`}>{text}</div>
    </div>
  );
}
