import { useContext } from 'react';
import { GlobalContext } from 'context/global-context';
import Setting from './Setting';
import styles from 'styles/Settings/Settings.module.scss';

export const settingsData = {
  time: [15, 30, 60, 120] as const,
  words: [10, 25, 50, 100] as const,
  quote: ['all', 'short', 'medium', 'long'] as const,
};
export type SettingsMode = keyof typeof settingsData;
export type SettingsTime = typeof settingsData.time[number];
export type SettingsWords = typeof settingsData.words[number];
export type SettingsQuote = typeof settingsData.quote[number];

interface Props {
  hidden: boolean;
  className?: string;
}

const Settings = ({ hidden, className }: Props) => {
  const {
    mode,
    time,
    wordsAmount,
    quoteLength,
    onMode,
    onTime,
    onWordsAmount,
    onQuoteLength,
  } = useContext(GlobalContext);

  return (
    <div className={`${styles.settings} ${className}`}>
      <Setting
        settings={Object.keys(settingsData)}
        active={mode}
        onChange={onMode}
        hidden={hidden}
      />
      {mode === 'time' ? (
        <Setting
          settings={settingsData.time}
          active={time}
          onChange={onTime}
          hidden={hidden}
        />
      ) : mode === 'words' ? (
        <Setting
          settings={settingsData.words}
          active={wordsAmount}
          onChange={onWordsAmount}
          hidden={hidden}
        />
      ) : (
        <Setting
          settings={settingsData.quote}
          active={
            quoteLength === 'all'
              ? (['short', 'medium', 'long'] as SettingsQuote[])
              : quoteLength
          }
          onChange={onQuoteLength}
          hidden={hidden}
        />
      )}
    </div>
  );
};

export default Settings;
