import { TextButton } from 'components/UI';
import styles from 'styles/Settings/SettingsItem.module.scss';

interface Props {
  title: string;
  settings: {
    buttons: { text: any; active?: boolean }[];
    onClick: (arg0: any) => void;
  };
}

const SettingsItem = ({ title, settings }: Props) => {
  return (
    <div className={styles.item}>
      <p className={styles['item__title']}>{title}:</p>
      <div className={styles['item__buttons']}>
        {settings.buttons.map((setting) => (
          <TextButton
            key={setting.text}
            text={String(setting.text)}
            className={styles.button}
            onClick={() => settings.onClick(setting.text)}
            isActive={!!setting.active}
          />
        ))}
      </div>
    </div>
  );
};

export default SettingsItem;
