import styles from './Switch.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  state: boolean;
  onToggle: () => void;
}

export default function Switch(props: Props) {
  const { state, onToggle, className, onClick, ...restProps } = props;

  return (
    <button
      className={`${styles.switch} ${
        state === true ? styles['switch--on'] : ''
      } ${className}`}
      onClick={(e) => {
        onToggle();
        onClick && onClick(e);
      }}
      {...restProps}
    >
      <span className={styles['switch__circle']} />
    </button>
  );
}
