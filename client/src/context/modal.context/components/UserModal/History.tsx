import styles from './History.module.scss';
import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '@/context/profile.context';
import { TypingContext } from '@/context/typing.context';
import { TypingResult } from '@/types';
import { ButtonRounded, Loading, Tooltip } from '@/components/UI';
import {
  IconAngleDoubleLeft,
  IconAngleDoubleRight,
  IconEyeOn,
  IconKeyboardArrowLeft,
} from '@/assets/image';
import { getTimeSince } from '@/helpers';

interface Props {
  onCloseModal: () => void;
}

export default function History({ onCloseModal }: Props) {
  const { profile, onLoadHistory } = useContext(ProfileContext);
  const { onPreviewResult } = useContext(TypingContext);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePreviewResult = (result: TypingResult) => {
    onPreviewResult(result);
    onCloseModal();
  };

  const items = profile?.history?.items && profile.history.items[currentPage];

  useEffect(() => {
    if (items === undefined) {
      onLoadHistory(currentPage);
    }
  }, [currentPage]);

  return (
    <div
      className={`${styles.container} ${
        !items || profile.history.totalPages > 1 ? styles.pagination : ''
      }`}
    >
      <table className={styles.history}>
        <thead>
          <tr className={styles.historyHeader}>
            <td>wpm</td>
            <td>accuracy</td>
            <td>raw</td>
            <td>date</td>
          </tr>
        </thead>

        {!items ? (
          <Loading type="spinner" className={styles.historyLoading} />
        ) : (
          <tbody>
            {items.map((result, i) => {
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
        )}
      </table>
      <div className={styles.pages}>
        <ButtonRounded
          variant="2"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          <IconAngleDoubleLeft />
        </ButtonRounded>

        <ButtonRounded
          variant="2"
          className={styles.pagesPrev}
          onClick={() => setCurrentPage((state) => Math.max(state - 1, 1))}
          disabled={currentPage === 1}
        >
          <IconKeyboardArrowLeft className={styles.pagesPrevIcon} />
          <span>Prev</span>
        </ButtonRounded>
        <div className={styles.pagesCurrentNum}>
          {currentPage + ' of ' + profile.history.totalPages}
        </div>
        <ButtonRounded
          variant="2"
          className={styles.pagesNext}
          onClick={() =>
            setCurrentPage((state) =>
              Math.min(state + 1, profile.history.totalPages)
            )
          }
          disabled={currentPage === profile.history.totalPages}
        >
          <span>Next</span>
          <IconKeyboardArrowLeft className={styles.pagesNextIcon} />
        </ButtonRounded>
        <ButtonRounded
          variant="2"
          onClick={() => setCurrentPage(profile.history.totalPages)}
          disabled={currentPage === profile.history.totalPages}
        >
          <IconAngleDoubleRight />
        </ButtonRounded>
      </div>
    </div>
  );
}
