import { useContext } from 'react';
import TypingContext from 'context/typing-context';
import SettingsItem from './SettingsItem';
import 'styles/Settings/Settings.scss';

interface Props {
  className?: string;
}

const Settings = ({ className }: Props) => {
  const {
    state: { difficulty, initialTime, typingStarted },
  } = useContext(TypingContext);

  const isActiveDifficulty = (paramDifficulty: typeof difficulty) =>
    paramDifficulty === difficulty;

  const isActiveTime = (paramTimer: typeof initialTime) =>
    paramTimer === initialTime;

  return (
    <div
      className={`settings ${
        typingStarted ? 'opacity-hidden' : ''
      } ${className}`}
    >
      <SettingsItem
        title="Difficulty"
        settings={{
          buttons: [
            { text: 'medium', active: isActiveDifficulty('medium') },
            { text: 'hard', active: isActiveDifficulty('hard') },
          ],
          action: 'SET_DIFFICULTY',
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
          action: 'SET_TIME',
        }}
      />
    </div>
  );
};

export default Settings;
