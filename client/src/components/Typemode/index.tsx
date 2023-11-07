import { useContext } from 'react';
import { TypemodeContext } from '@/context/typemode.context';
import { data } from '@/data';
import Setting from './Setting';
import styles from '@/styles/Typemode/Typemode.module.scss';
import { QuoteLengthType } from 'shared/types';

interface Props {
  hidden: boolean;
  className?: string;
}

const Typemode = ({ hidden, className }: Props) => {
  const {
    mode,
    time,
    wordsAmount,
    quoteLength,
    onMode,
    onTime,
    onWordsAmount,
    onQuoteLength,
  } = useContext(TypemodeContext);

  return (
    <div className={`${styles.settings} ${className}`}>
      <Setting
        settings={Object.keys(data.typemode)}
        active={mode}
        onChange={onMode}
        hidden={hidden}
      />
      {mode === 'time' ? (
        <Setting
          settings={data.typemode.time}
          active={time}
          onChange={onTime}
          hidden={hidden}
        />
      ) : mode === 'words' ? (
        <Setting
          settings={data.typemode.words}
          active={wordsAmount}
          onChange={onWordsAmount}
          hidden={hidden}
        />
      ) : (
        <Setting
          settings={data.typemode.quote}
          active={
            quoteLength === 'all'
              ? (['short', 'medium', 'long'] as QuoteLengthType[])
              : quoteLength
          }
          onChange={onQuoteLength}
          hidden={hidden}
        />
      )}
    </div>
  );
};

export default Typemode;
