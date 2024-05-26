import styles from './NameAndValue.module.scss';

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  name: string;
  value: string | number;
  className?: string;
}

export default function NameAndValue(props: Props) {
  const { name, value, ...restProps } = props;

  return (
    <div {...restProps}>
      <div className={styles.name}>{name}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}
