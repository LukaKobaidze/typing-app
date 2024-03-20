import { IconStats } from '@/assets/image';
import StatsItem from './StatsItem';
import { useContext } from 'react';
import { ProfileContext } from '@/context/profile.context';
import styles from './Stats.module.scss';

interface Props {}

export default function Stats(props: Props) {
  const { profile } = useContext(ProfileContext);

  return (
    <>
      <div className={styles.testsCountWrapper}>
        <StatsItem name="tests started" value={profile.stats.testsStarted || 0} />
        <StatsItem
          name="tests completed"
          value={profile.stats.testsCompleted || 0}
        />
      </div>
      <div className={styles.averageAndHighestWrapper}>
        <div className={styles.testStatsWrapper}>
          <StatsItem name="highest wpm" value={profile.stats.highest?.wpm || 0} />
          <StatsItem
            name="highest accuracy"
            value={(profile.stats.highest?.accuracy || 0) + '%'}
          />
          <StatsItem name="highest raw" value={profile.stats.highest?.raw || 0} />
        </div>

        <div className={styles.testStatsWrapper}>
          <StatsItem name="average wpm" value={profile.stats.average?.wpm || 0} />
          <StatsItem
            name="average accuracy"
            value={(profile.stats.average?.accuracy || 0) + '%'}
          />
          <StatsItem name="average raw" value={profile.stats.average?.raw || 0} />
        </div>
      </div>
    </>
  );
}
