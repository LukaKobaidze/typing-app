import styles from '@/styles/UI/TextButton.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isActive: boolean;
}

export default function TextButton(props: Props) {
  const { text, isActive, className, ...rest } = props;

  return (
    <button
      className={`${styles.button} ${isActive ? styles.active : ''} ${className}`}
      {...rest}
    >
      {text}
    </button>
  );
}
