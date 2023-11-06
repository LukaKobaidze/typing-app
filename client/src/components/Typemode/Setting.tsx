import { TextButton } from '@/components/UI';
import styles from '@/styles/Typemode/Setting.module.scss';

interface Props {
  settings: readonly (string | number)[];
  active: (string | number) | (string | number)[];
  onChange: (arg0: any) => void;
  hidden: boolean;
}

const SettingsItem = ({ settings, active, onChange, hidden }: Props) => {
  return (
    <div className={styles.item}>
      <div className={styles['item__buttons']}>
        {settings.map((setting) => (
          <TextButton
            key={setting}
            text={String(setting)}
            className={styles.button}
            onClick={() => onChange(setting)}
            isActive={
              Array.isArray(active) ? active.includes(setting) : setting === active
            }
            tabIndex={hidden ? -1 : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default SettingsItem;
