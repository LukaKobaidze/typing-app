import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import styles from 'styles/Typing/ResultCustomTooltip.module.scss';

type Props = TooltipProps<ValueType, NameType>;

export default function ResultCustomTooltip(props: Props) {
  const { active, payload, label } = props;

  if (active && payload && payload.length) {
    return (
      <div className={styles.container}>
        <p className={styles.label}>{label}</p>
        <div>
          {payload.map((pld) => (
            <div key={pld.dataKey} className={styles.item}>
              <div
                className={styles['item__color-block']}
                style={{ backgroundColor: pld.color }}
              />
              <p className={styles['item__text']}>
                <span>{pld.dataKey}: </span>
                <span className={styles['item__value']}>{pld.value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
