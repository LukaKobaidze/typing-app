import 'styles/UI/PercentCircleChart.scss';

interface Props {
  percentage: number;
  className?: string;
}

const PercentCircleChart = ({ percentage, className }: Props) => {
  return (
    <div className={`percent-circle-chart ${className}`}>
      <div className="percent-circle-chart__empty" />
      <div className="percent-circle-chart__filled" />
      <div className="percent-circle-chart__middle">
        <p>{percentage}</p>
      </div>
    </div>
  );
};

export default PercentCircleChart;
