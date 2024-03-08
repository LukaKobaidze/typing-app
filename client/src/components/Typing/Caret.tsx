import { useContext, useEffect, useState } from 'react';
import { TypingContext } from '@/context/typing.context';
import styles from '@/styles/Typing/Caret.module.scss';
import { ProfileContext } from '@/context/profile.context';

interface Props {
  wordIndex: number;
  charIndex: number;
  wordsOffset: number;
  firstWord: string;
  wordRef: React.MutableRefObject<HTMLDivElement | undefined>;
  charRef: React.MutableRefObject<HTMLSpanElement | undefined>;
  className?: string;
}

export default function Caret(props: Props) {
  const {
    wordIndex,
    charIndex,
    wordsOffset,
    firstWord,
    wordRef,
    charRef,
    className,
  } = props;

  const { typingStarted } = useContext(TypingContext);
  const { profile } = useContext(ProfileContext);

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
      className={`${styles.caret} ${
        styles[`caret--${profile.customize.caretStyle}`]
      } ${profile.customize.smoothCaret ? styles.smooth : ''} ${
        !typingStarted
          ? profile.customize.smoothCaret
            ? styles['blink-smooth']
            : styles['blink']
          : ''
      } ${className || ''}`}
      style={{ transform: `translate(${caretPos.x}px, ${caretPos.y}px)` }}
    />
  );
}
