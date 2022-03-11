import { Logo } from 'components/UI';
import { TypingDifficulty, TypingTime } from 'shared/types/typing.type';
import 'styles/Header/Header.scss';
import QuickSettings from './QuickSettings';

interface Props {
  difficulty: TypingDifficulty;
  timer: TypingTime;
  changeDifficulty: (arg0: TypingDifficulty) => void;
  changeTimer: (arg0: TypingTime) => void;
}

const Header = (props: Props) => {
  const { difficulty, timer, changeDifficulty, changeTimer } = props;

  return (
    <header className="header">
      <Logo />
      <QuickSettings
        difficulty={difficulty}
        timer={timer}
        changeDifficulty={changeDifficulty}
        changeTimer={changeTimer}
      />
    </header>
  );
};

export default Header;
