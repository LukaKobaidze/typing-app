import styles from 'styles/UI/TextButton.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isActive: boolean;
}

const TextButton = ({ text, isActive, className, ...rest }: Props) => {
  return (
    <button
      className={`${styles.button} ${
        isActive ? styles.active : ''
      } ${className}`}
      {...rest}
    >
      {text}
    </button>
  );
};

export default TextButton;
