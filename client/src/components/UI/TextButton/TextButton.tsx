import styles from './TextButton.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

export default function TextButton(props: Props) {
  const { isActive, className, children, ...rest } = props;

  return (
    <button
      className={`${styles.button} ${isActive ? styles.active : ''} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
