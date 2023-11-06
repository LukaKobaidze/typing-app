import styles from '@/styles/Stats/StatItem.module.scss';

interface Props {
  name: string;
  value: string | number;
  className?: string;
}

export default function StatItem(props: Props) {
  const { name, value, className } = props;

  return (
    <div className={className || ''}>
      <div className={styles.name}>{name}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}
