import { TypingState } from 'shared/types/typing.type';
import { Timer } from 'components/UI';
import Word from './Word';
import 'styles/Typing/Typing.scss';
import Result from './Result';
import Reset from './Reset';

interface Props {
  typingState: TypingState;
  deleteKey: () => void;
  type: (key: string) => void;
}

const Typing = ({ typingState, deleteKey, type }: Props) => {
  const typeHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Backspace') {
      return deleteKey();
    }

    if (event.key.length === 1) {
      return type(event.key);
    }
  };

  return (
    <div className="typing" tabIndex={-1} onKeyDown={typeHandler}>
      <Timer seconds={typingState.timerCountdown} />
      <div className="typing__words">
        {typingState.words.map((word, index) => (
          <Word
            key={index}
            word={word}
            isCurrentWord={index === typingState.currentWord}
            currentLetter={typingState.currentLetter}
          />
        ))}
      </div>
      <Reset />
      {typingState.timerCountdown === 0 && (
        <Result
          typedWords={typingState.words.slice(0, typingState.currentWord + 1)}
          secondsTook={typingState.initialTime}
        />
      )}
    </div>
  );
};

export default Typing;
