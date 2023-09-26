import styles from 'styles/UI/PercentCircleChart.module.scss';

interface Props {
  percentage: number;
  className?: string;
}

export default function PercentCircleChart(props: Props) {
  const { percentage, className } = props;

  const style = { '--percent': percentage } as React.CSSProperties;

  return (
    <div className={`${styles.circle} ${className}`} style={style}>
      <div className={styles['circle__empty']} />
      <div className={styles['circle__filled']} />
      <div className={styles['circle__middle']}>
        <p
          className={`${styles['circle__text']} ${
            styles[`circle__text--${percentage >= 75 ? 'success' : 'fail'}`]
          }`}
        >
          {percentage}%
        </p>
      </div>
    </div>
  );
}
