import { useContext, useEffect } from 'react';
import TypingContext from 'context/typing-context';
import { Timer } from 'components/UI';
import Word from './Word';
import Result from './Result';
import Reset from './Reset';
import 'styles/Typing/Typing.scss';

const Typing = () => {
  const { state, dispatch } = useContext(TypingContext);

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (state.typingStarted) {
      interval = setInterval(() => {
        dispatch({ type: 'TIME_DECREMENT' });
      }, 1000);
    } else {
      clearInterval(interval!);
    }

    return () => clearInterval(interval);
  }, [state.typingStarted, dispatch]);

  useEffect(() => {
    const typeHandler = (event: KeyboardEvent) => {
      if (event.key === 'Backspace') {
        return dispatch({ type: 'DELETE_KEY' });
      }

      if (event.key.length === 1) {
        return dispatch({ type: 'TYPE', payload: event.key });
      }
    };

    document.addEventListener('keydown', typeHandler);

    return () => document.removeEventListener('keydown', typeHandler);
  }, [dispatch]);

  return (
    <div className="typing">
      <Timer seconds={state.timerCountdown} />
      <div className="typing__words">
        {state.words.map((word, index) => (
          <Word
            key={index}
            word={word}
            isCurrentWord={index === state.currentWord}
            currentLetter={state.currentLetter}
          />
        ))}
      </div>
      <Reset />
      {state.timerCountdown === 0 && (
        <Result
          typedWords={state.words.slice(0, state.currentWord + 1)}
          secondsTook={state.initialTime}
        />
      )}
    </div>
  );
};

export default Typing;
