import styles from './History.module.scss';
import { useContext } from 'react';
import { ProfileContext } from '@/context/profile.context';
import { TypingContext } from '@/context/typing.context';
import { TypingResult } from '@/types';
import { Tooltip } from '@/components/UI';
import { IconEyeOn } from '@/assets/image';
import { getTimeSince } from '@/helpers';

interface Props {
  onCloseModal: () => void;
}

export default function History({ onCloseModal }: Props) {
  const { profile } = useContext(ProfileContext);
  const { onPreviewResult } = useContext(TypingContext);

  const handlePreviewResult = (result: TypingResult) => {
    onPreviewResult(result);
    onCloseModal();
  };

  return (
    <>
      {profile.history.length === 0 ? (
        <p className={styles.historyEmptyMessage}>
          History is empty, start typing and complete your first test!
        </p>
      ) : (
        <table className={styles.history}>
          <thead>
            <tr className={styles.historyHeader}>
              <td>wpm</td>
              <td>accuracy</td>
              <td>raw</td>
              <td>date</td>
            </tr>
          </thead>
          <tbody>
            {profile.history.map((result, i) => {
              const { timeline, date } = result;
              const { wpm, accuracy, raw } = timeline[timeline.length - 1];

              return (
                <tr
                  key={i}
                  className={`${styles.historyColumn} ${
                    i % 2 !== 0 ? styles.historyColumnColored : ''
                  }`}
                  tabIndex={0}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter' || e.key === 'Spacebar') {
                      handlePreviewResult(result);
                    }
                  }}
                  onClick={() => handlePreviewResult(result)}
                >
                  <td className={styles.tdWpm}>{wpm}</td>
                  <td className={styles.tdAccuracy}>{accuracy}%</td>
                  <td className={styles.tdRaw}>{raw}</td>
                  <td className={styles.tdDate}>
                    <Tooltip
                      text={
                        <div className={styles.tdDateTooltip}>
                          <span>{date?.toLocaleDateString('en-US')}</span>
                          <span>
                            {date?.toLocaleString('en-US', {
                              hour: 'numeric',
                              minute: 'numeric',
                              hour12: true,
                            })}
                          </span>
                        </div>
                      }
                      position="top"
                      showOnHover
                    >
                      <span>{date ? getTimeSince(date, true) : ''}</span>
                    </Tooltip>
                  </td>
                  <IconEyeOn className={styles.historyColumnPreviewIcon} />
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
