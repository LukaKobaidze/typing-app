import styles from '@/styles/Typemode/Typemode.module.scss';
import { data } from '@/data';
import { useContext, useMemo } from 'react';
import { TypemodeContext } from '@/context/typemode.context';
import { TypemodeType } from '@/data/types';
import Column, { ColumnProps } from './Column';
import {
  IconNumbers,
  IconPunctuation,
  IconQuote,
  IconTags,
  IconTime,
  IconWords,
} from '@/assets/image';
import { ModalContext } from '@/context/modal.context';

interface Props {
  className?: string;
}

export default function Typemode({ className }: Props) {
  const {
    mode,
    time,
    quote,
    words,
    punctuation,
    numbers,
    onMode,
    onTime,
    onQuote,
    onWords,
    onPunctuationToggle,
    onNumbersToggle,
  } = useContext(TypemodeContext);

  const { onOpenModal } = useContext(ModalContext);

  const typemodeKeys = Object.keys(data.typemode) as TypemodeType[];

  const colFirstButtons = useMemo<ColumnProps['buttons']>(() => {
    const active = [];

    if (punctuation) active.push('punctuation');
    if (numbers) active.push('numbers');

    return mode === 'words' || mode === 'time'
      ? [
          {
            Icon: IconPunctuation,
            text: 'punctuation',
            action: () => onPunctuationToggle(),
            active: punctuation,
          },
          {
            Icon: IconNumbers,
            text: 'numbers',
            action: () => onNumbersToggle(),
            active: numbers,
          },
        ]
      : [
          {
            Icon: IconTags,
            text: 'tags',
            action: () => onOpenModal('quoteTags'),
            active: false,
          },
        ];
  }, [mode, punctuation, numbers]);

  const modeIcons = { time: IconTime, words: IconWords, quote: IconQuote };

  const colSecondButtons = useMemo<ColumnProps['buttons']>(() => {
    return typemodeKeys.map((modeLocal) => ({
      Icon: modeIcons[modeLocal],
      text: modeLocal,
      action: () => onMode(modeLocal),
      active: modeLocal === mode,
    }));
  }, [mode]);

  const colThirdButtons = useMemo<ColumnProps['buttons']>(() => {
    return mode === 'time'
      ? data.typemode.time.map((timeLocal) => ({
          text: timeLocal,
          action: () => onTime(timeLocal),
          active: timeLocal === time,
        }))
      : mode === 'words'
      ? data.typemode.words.map((wordsLocal) => ({
          text: wordsLocal,
          action: () => onWords(wordsLocal),
          active: wordsLocal === words,
        }))
      : data.typemode.quote.map((quoteLocal) => ({
          text: quoteLocal,
          action: () => onQuote(quoteLocal),
          active: quote === 'all' ? quoteLocal !== 'all' : quoteLocal === quote,
        }));
  }, [mode, time, words, quote]);

  return (
    <div className={`${styles.container} ${className}`}>
      <Column buttons={colFirstButtons} />

      {!!colFirstButtons.length && <div className={styles.splitBar} />}
      <Column buttons={colSecondButtons} />
      {!!colThirdButtons.length && <div className={styles.splitBar} />}

      <Column buttons={colThirdButtons} />
    </div>
  );
}
