import { useReducer } from 'react';
import { typeReducer } from './typing-reducer';
import Word from './Word';
import Caret from './Caret';
import 'styles/Typing/Typing.scss';

export type typeState = {
  currentWord: number;
  currentLetter: number;
  sentence: {
    letter: string;
    state: 'correct' | 'incorrect' | 'none';
    extra: boolean;
  }[][];
};

interface Props {
  sentence: string;
}

const Typing = ({ sentence }: Props) => {
  const initialTypeState: typeState = {
    currentWord: 0,
    currentLetter: 0,
    sentence: sentence.split(' ').map((word) => {
      return word.split('').map((letter) => {
        return {
          letter,
          state: 'none',
          extra: false,
        };
      });
    }),
  };

  const [typeState, dispatch] = useReducer(typeReducer, initialTypeState);

  const typeHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Backspace') {
      return dispatch({ type: 'DELETE' });
    }

    if (event.key.length === 1) {
      return dispatch({ type: 'TYPE', payload: event.key });
    }
  };

  return (
    <div className="typing" tabIndex={-1} onKeyDown={typeHandler}>
      {/* <Caret currentLetterRef={currentLetterRef} /> */}
      <div className="typing__words">
        {typeState.sentence.map((word, index) => (
          <Word
            key={index}
            word={word}
            currentLetter={
              index === typeState.currentWord
                ? typeState.currentLetter
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Typing;
