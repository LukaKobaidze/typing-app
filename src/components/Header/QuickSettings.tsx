import { TextButton } from 'components/UI';
import { TypingDifficulty, TypingTime } from 'shared/types/typing.type';
import 'styles/Header/QuickSettings.scss';

interface Props {
  difficulty: TypingDifficulty;
  timer: TypingTime;
  changeDifficulty: (arg0: TypingDifficulty) => void;
  changeTimer: (arg0: TypingTime) => void;
}

const QuickSettings = (props: Props) => {
  const { difficulty, timer, changeDifficulty, changeTimer } = props;

  const checkActiveDifficulty = (paramDifficulty: TypingDifficulty) =>
    paramDifficulty === difficulty;

  const checkActiveTimer = (paramTimer: TypingTime) => paramTimer === timer;

  return (
    <div className="quick-settings">
      <div className="quick-settings__setting">
        <p>Difficulty:</p>
        <TextButton
          text="medium"
          className={`quick-settings__button`}
          onClick={() => changeDifficulty('medium')}
          isActive={checkActiveDifficulty('medium')}
        />
        <TextButton
          text="hard"
          className="quick-settings__button"
          onClick={() => changeDifficulty('hard')}
          isActive={checkActiveDifficulty('hard')}
        />
      </div>
      <div className="quick-settings__setting">
        <p>Time:</p>
        <TextButton
          text="1"
          className="quick-settings__button"
          isActive={checkActiveTimer(1)}
          onClick={() => changeTimer(1)}
        />
        <TextButton
          text="15"
          className="quick-settings__button"
          isActive={checkActiveTimer(15)}
          onClick={() => changeTimer(15)}
        />
        <TextButton
          text="30"
          className="quick-settings__button"
          isActive={checkActiveTimer(30)}
          onClick={() => changeTimer(30)}
        />
        <TextButton
          text="60"
          className="quick-settings__button"
          isActive={checkActiveTimer(60)}
          onClick={() => changeTimer(60)}
        />
        <TextButton
          text="120"
          className="quick-settings__button"
          isActive={checkActiveTimer(120)}
          onClick={() => changeTimer(120)}
        />
      </div>
    </div>
  );
};

export default QuickSettings;
