import { useContext } from 'react';
import { GlobalContext } from 'context/global-context';
import SettingsItem from './SettingsItem';
import styles from 'styles/Settings/Settings.module.scss';

export const settingsData = {
  time: [15, 30, 60, 120] as const,
  words: [10, 25, 50, 100] as const,
};
export type SettingsMode = keyof typeof settingsData;
export type SettingsTime = typeof settingsData.time[number];
export type SettingsWords = typeof settingsData.words[number];

interface Props {
  className?: string;
}

const Settings = ({ className }: Props) => {
  const { mode, time, wordsAmount, onMode, onTime, onWordsAmount } =
    useContext(GlobalContext);

  return (
    <div className={`${styles.settings} ${className}`}>
      <SettingsItem
        settings={Object.keys(settingsData)}
        active={mode}
        onChange={onMode}
      />
      {mode === 'time' ? (
        <SettingsItem
          settings={settingsData.time}
          active={time}
          onChange={onTime}
        />
      ) : (
        <SettingsItem
          settings={settingsData.words}
          active={wordsAmount}
          onChange={onWordsAmount}
        />
      )}
    </div>
  );
};

export default Settings;
