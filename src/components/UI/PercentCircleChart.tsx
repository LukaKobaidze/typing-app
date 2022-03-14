import 'styles/UI/PercentCircleChart.scss';

interface Props {
  percentage: number;
  className?: string;
}

const PercentCircleChart = ({ percentage, className }: Props) => {
  const style = { '--percent': percentage } as React.CSSProperties;

  return (
    <div className={`percent-circle-chart ${className}`} style={style}>
      <div className="percent-circle-chart__empty" />
      <div className="percent-circle-chart__filled" />
      <div className="percent-circle-chart__middle">
        <p
          className={`percent-circle-chart__text percent-circle-chart__text--${
            percentage >= 75 ? 'success' : 'fail'
          }`}
        >
          {percentage}%
        </p>
      </div>
    </div>
  );
};

export default PercentCircleChart;
