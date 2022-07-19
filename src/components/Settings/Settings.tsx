import { useContext } from 'react';
import { GlobalContext } from 'context';
import SettingsItem from './SettingsItem';
import styles from 'styles/Settings/Settings.module.scss';

interface Props {
  className?: string;
}

const Settings = ({ className }: Props) => {
  const { mode, time, wordsAmount, onMode, onTime, onWordsAmount } =
    useContext(GlobalContext);

  return (
    <div className={`${styles.settings} ${className}`}>
      <SettingsItem
        settings={['time', 'words']}
        active={mode}
        onChange={onMode}
      />
      {mode === 'time' ? (
        <SettingsItem
          settings={[15, 30, 60, 120]}
          active={time}
          onChange={onTime}
        />
      ) : (
        <SettingsItem
          settings={[10, 25, 50, 100]}
          active={wordsAmount}
          onChange={onWordsAmount}
        />
      )}
    </div>
  );
};

export default Settings;
