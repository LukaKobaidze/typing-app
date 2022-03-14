import { useContext } from 'react';
import TypingContext from 'context/typing-context';
import { TextButton } from 'components/UI';
import 'styles/Header/Settings.scss';

const Settings = () => {
  const {
    state: { difficulty, initialTime },
    dispatch,
  } = useContext(TypingContext);

  const checkActiveDifficulty = (paramDifficulty: typeof difficulty) =>
    paramDifficulty === difficulty;

  const checkActiveTimer = (paramTimer: typeof initialTime) =>
    paramTimer === initialTime;

  return (
    <div className="quick-settings">
      <div className="quick-settings__setting">
        <p>Difficulty:</p>
        <TextButton
          text="medium"
          className={`quick-settings__button`}
          onClick={() =>
            dispatch({ type: 'SET_DIFFICULTY', payload: 'medium' })
          }
          isActive={checkActiveDifficulty('medium')}
        />
        <TextButton
          text="hard"
          className="quick-settings__button"
          onClick={() => dispatch({ type: 'SET_DIFFICULTY', payload: 'hard' })}
          isActive={checkActiveDifficulty('hard')}
        />
      </div>
      <div className="quick-settings__setting">
        <p>Time:</p>
        <TextButton
          text="1"
          className="quick-settings__button"
          isActive={checkActiveTimer(1)}
          onClick={() => dispatch({ type: 'SET_TIME', payload: 1 })}
        />
        <TextButton
          text="15"
          className="quick-settings__button"
          isActive={checkActiveTimer(15)}
          onClick={() => dispatch({ type: 'SET_TIME', payload: 15 })}
        />
        <TextButton
          text="30"
          className="quick-settings__button"
          isActive={checkActiveTimer(30)}
          onClick={() => dispatch({ type: 'SET_TIME', payload: 30 })}
        />
        <TextButton
          text="60"
          className="quick-settings__button"
          isActive={checkActiveTimer(60)}
          onClick={() => dispatch({ type: 'SET_TIME', payload: 60 })}
        />
        <TextButton
          text="120"
          className="quick-settings__button"
          isActive={checkActiveTimer(120)}
          onClick={() => dispatch({ type: 'SET_TIME', payload: 120 })}
        />
      </div>
    </div>
  );
};

export default Settings;
