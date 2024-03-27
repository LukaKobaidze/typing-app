import { useContext } from 'react';
import { ProfileContext } from '@/context/profile.context';
import NameAndValue from '@/components/UI/NameAndValue';
import styles from './Stats.module.scss';

interface Props {}

export default function Stats(props: Props) {
  const { profile } = useContext(ProfileContext);

  return (
    <>
      <div className={styles.testsCountWrapper}>
        <NameAndValue name="tests started" value={profile.stats.testsStarted || 0} />
        <NameAndValue
          name="tests completed"
          value={profile.stats.testsCompleted || 0}
        />
      </div>
      <div className={styles.averageAndHighestWrapper}>
        <div className={styles.testStatsWrapper}>
          <NameAndValue name="highest wpm" value={profile.stats.highest?.wpm || 0} />
          <NameAndValue
            name="highest accuracy"
            value={(profile.stats.highest?.accuracy || 0) + '%'}
          />
          <NameAndValue name="highest raw" value={profile.stats.highest?.raw || 0} />
        </div>

        <div className={styles.testStatsWrapper}>
          <NameAndValue name="average wpm" value={profile.stats.average?.wpm || 0} />
          <NameAndValue
            name="average accuracy"
            value={(profile.stats.average?.accuracy || 0) + '%'}
          />
          <NameAndValue name="average raw" value={profile.stats.average?.raw || 0} />
        </div>
      </div>
    </>
  );
}
