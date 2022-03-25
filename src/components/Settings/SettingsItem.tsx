import { useContext } from 'react';
import { TypingContext } from 'context';
import { TypingDifficulty, TypingTime } from 'shared/types';
import { TextButton } from 'components/UI';
import styles from 'styles/Settings/SettingsItem.module.scss';

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
    <div className={styles.item}>
      <p className={styles['item__title']}>{title}:</p>
      <div className={styles['item__buttons']}>
        {settings.buttons.map((setting) => (
          <TextButton
            key={setting.text}
            text={String(setting.text)}
            className={styles.button}
            onClick={() => clickHandler(setting.text)}
            isActive={!!setting.active}
          />
        ))}
      </div>
    </div>
  );
};

export default SettingsItem;
