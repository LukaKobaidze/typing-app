import { useContext } from 'react';
import {
  TypemodeContext,
  TypemodeQuote,
  typemodeData,
} from 'context/typemode.context';
import Setting from './Setting';
import styles from 'styles/Typemode/Typemode.module.scss';

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
        settings={Object.keys(typemodeData)}
        active={mode}
        onChange={onMode}
        hidden={hidden}
      />
      {mode === 'time' ? (
        <Setting
          settings={typemodeData.time}
          active={time}
          onChange={onTime}
          hidden={hidden}
        />
      ) : mode === 'words' ? (
        <Setting
          settings={typemodeData.words}
          active={wordsAmount}
          onChange={onWordsAmount}
          hidden={hidden}
        />
      ) : (
        <Setting
          settings={typemodeData.quote}
          active={
            quoteLength === 'all'
              ? (['short', 'medium', 'long'] as TypemodeQuote[])
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
