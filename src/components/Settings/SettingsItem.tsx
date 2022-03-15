import { useContext } from 'react';
import TypingContext from 'context/typing-context';
import { TypingDifficulty, TypingTime } from 'context/state-types';
import { TextButton } from 'components/UI';
import 'styles/Settings/SettingsItem.scss';

interface Props {
  title: string;
  settings:
    | {
        buttons: { text: TypingDifficulty; active?: boolean }[];
        action: 'SET_DIFFICULTY';
      }
    | {
        buttons: { text: TypingTime; active?: boolean }[];
        action: 'SET_TIME';
      };
}

const SettingsItem = ({ title, settings }: Props) => {
  const { dispatch } = useContext(TypingContext);

  const clickHandler = (payload: TypingDifficulty | TypingTime) => {
    switch (settings.action) {
      case 'SET_DIFFICULTY':
        return dispatch({
          type: 'SET_DIFFICULTY',
          payload: payload as TypingDifficulty,
        });
      case 'SET_TIME':
        return dispatch({
          type: 'SET_TIME',
          payload: payload as TypingTime,
        });
    }
  };

  return (
    <div className="settings__setting">
      <p className="settings__setting__title">{title}:</p>
      <div className="settings__setting__buttons">
        {settings.buttons.map((setting) => (
          <TextButton
            key={setting.text}
            text={String(setting.text)}
            className={`settings__button`}
            onClick={() => clickHandler(setting.text)}
            isActive={!!setting.active}
          />
        ))}
      </div>
    </div>
  );
};

export default SettingsItem;
