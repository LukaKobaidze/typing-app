import { GlobalContext } from 'context/global-context';
import { useContext, useEffect, useState } from 'react';
import styles from 'styles/Typing/Caret.module.scss';

interface Props {
  wordIndex: number;
  charIndex: number;
  wordsOffset: number;
  firstWord: string;
  wordRef: React.RefObject<HTMLDivElement>;
  charRef: React.RefObject<HTMLSpanElement>;
}

export default function Caret(props: Props) {
  const { wordIndex, charIndex, wordsOffset, firstWord, wordRef, charRef } = props;

  const { typingStarted } = useContext(GlobalContext);

  const [caretPos, setCaretPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!wordRef.current) return;
    const {
      offsetLeft: wordOffsetLeft,
      offsetTop: wordOffsetTop,
      offsetWidth: wordOffsetWidth,
    } = wordRef.current;

    if (!charRef.current) {
      return setCaretPos({
        x: wordOffsetLeft + wordOffsetWidth,
        y: wordOffsetTop - wordsOffset,
      });
    }

    const { offsetLeft: charOffsetLeft } = charRef.current;
    setCaretPos({
      x: wordOffsetLeft + charOffsetLeft,
      y: wordOffsetTop - wordsOffset,
    });
  }, [wordIndex, charIndex, wordsOffset, firstWord, wordRef, charRef]);

  return (
    <div
      className={`${styles.caret} ${!typingStarted ? styles.animate : ''}`}
      style={{ transform: `translate(${caretPos.x}px, ${caretPos.y}px)` }}
    />
  );
}
