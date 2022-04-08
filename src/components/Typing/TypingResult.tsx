import { useContext } from 'react';
import { TypingContext } from 'context';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Legend,
  Line,
} from 'recharts';
import { PercentCircleChart } from 'components/UI';
import TypingRestart from './TypingRestart';
import styles from 'styles/Typing/TypingResult.module.scss';

const config = {
  colorWpm: '#dcdcdc',
  colorAccuracy: '#00faa7',
  labelOffset: -40,
  labelFontSize: 14,
};

const TypingResult = () => {
  const {
    state: { results },
    dispatch,
  } = useContext(TypingContext);

  return (
    <div className={styles['result__wrapper']}>
      <div className={styles.result}>
        <div className={styles['wpm-accuracy-container']}>
          <div className={styles.wpm}>
            <p>WPM</p>
            <p className={styles['wpm__num']}>{results.wpm}</p>
          </div>
          <div className={styles.accuracy}>
            <p>Accuracy</p>
            <PercentCircleChart
              percentage={results.accuracy}
              className={styles['percentage-circle']}
            />
          </div>
        </div>
        <div className={styles.chart}>
          <ResponsiveContainer className={styles.chart}>
            <LineChart data={results.timeline}>
              <XAxis dataKey="second" />
              <YAxis dataKey="wpm" yAxisId="left">
                <Label
                  value="wpm"
                  angle={-90}
                  fill={config.colorWpm}
                  fontSize={config.labelFontSize}
                  position="right"
                  offset={config.labelOffset}
                  className={styles.label}
                />
              </YAxis>
              <YAxis
                domain={[0, 100]}
                dataKey="accuracy"
                yAxisId="right"
                orientation="right"
              >
                <Label
                  value="accuracy"
                  angle={-90}
                  fill={config.colorAccuracy}
                  fontSize={config.labelFontSize}
                  position="left"
                  offset={config.labelOffset}
                  className={styles.label}
                />
              </YAxis>
              <CartesianGrid opacity={0.15} />
              <Tooltip contentStyle={{ backgroundColor: '#0d0d1d' }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="wpm"
                yAxisId="left"
                dot={{
                  stroke: config.colorWpm,
                  strokeWidth: 2,
                  r: 2,
                }}
                stroke={config.colorWpm}
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                yAxisId="right"
                dot={{
                  stroke: config.colorAccuracy,
                  strokeWidth: 2,
                  r: 2,
                }}
                stroke={config.colorAccuracy}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <TypingRestart className={styles.restart} />
    </div>
  );
};

export default TypingResult;
