import { useContext } from 'react';
import { GlobalContext } from 'context';
import { TypingTime } from 'types/typing.type';
import SettingsItem from './SettingsItem';
import styles from 'styles/Settings/Settings.module.scss';

interface Props {
  className?: string;
}

const Settings = ({ className }: Props) => {
  const { difficulty, time, onDifficulty, onTime } = useContext(GlobalContext);

  const isActiveDifficulty = (paramDifficulty: typeof difficulty) =>
    paramDifficulty === difficulty;

  const isActiveTime = (paramTimer: TypingTime) => paramTimer === time;

  return (
    <div className={`${styles.settings} ${className}`}>
      <SettingsItem
        title="Difficulty"
        settings={{
          buttons: [
            { text: 'medium', active: isActiveDifficulty('medium') },
            { text: 'hard', active: isActiveDifficulty('hard') },
          ],
          onClick: onDifficulty,
        }}
      />
      <SettingsItem
        title="Time"
        settings={{
          buttons: [
            { text: 15, active: isActiveTime(15) },
            { text: 30, active: isActiveTime(30) },
            { text: 60, active: isActiveTime(60) },
            { text: 120, active: isActiveTime(120) },
          ],
          onClick: onTime,
        }}
      />
    </div>
  );
};

export default Settings;
