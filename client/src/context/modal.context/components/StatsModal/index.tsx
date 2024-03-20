import { useContext } from 'react';
import { StatsContext } from '@/context/stats.context';
import { IconStats } from '@/assets/image';
import StatItem from './StatsItem';
import Modal from '@/components/Modal';
import styles from '@/styles/Stats/StatsModal.module.scss';

interface Props {
  onClose: () => void;
}

export default function StatsModal(props: Props) {
  const { onClose } = props;

  const { testsStarted, testsCompleted, highest, average } =
    useContext(StatsContext);

  return (
    <Modal heading="Stats" HeadingIcon={IconStats} onClose={onClose}>
      <div className={styles.testsCountWrapper}>
        <StatItem name="tests started" value={testsStarted} />
        <StatItem name="tests completed" value={testsCompleted} />
      </div>

      <div className={styles.averageAndHighestWrapper}>
        {highest && (
          <div className={styles.testStatsWrapper}>
            <StatItem name="highest wpm" value={highest.wpm} />
            <StatItem name="highest accuracy" value={highest.accuracy + '%'} />
            <StatItem name="highest raw" value={highest.raw} />
          </div>
        )}

        {average && (
          <div className={styles.testStatsWrapper}>
            <StatItem name="average wpm" value={average.wpm} />
            <StatItem name="average accuracy" value={average.accuracy + '%'} />
            <StatItem name="average raw" value={average.raw} />
          </div>
        )}
      </div>
    </Modal>
  );
}
