import { TextButton } from 'components/UI';
import styles from 'styles/Settings/SettingsItem.module.scss';

interface Props {
  settings: readonly (string | number)[];
  active: string | number;
  onChange: (arg0: any) => void;
}

const SettingsItem = ({ settings, active, onChange }: Props) => {
  return (
    <div className={styles.item}>
      <div className={styles['item__buttons']}>
        {settings.map((setting) => (
          <TextButton
            key={setting}
            text={String(setting)}
            className={styles.button}
            onClick={() => onChange(setting)}
            isActive={setting === active}
          />
        ))}
      </div>
    </div>
  );
};

export default SettingsItem;
