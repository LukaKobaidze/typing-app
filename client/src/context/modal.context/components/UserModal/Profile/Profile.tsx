import { IconHistory, IconStats } from '@/assets/image';
import Stats from './Stats';
import History from './History';
import styles from './Profile.module.scss';

interface Props {
  onCloseModal: () => void;
}

export default function Profile({ onCloseModal }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <IconStats className={styles.titleIcon} />
        <span>Stats</span>
      </div>
      <Stats />

      <div className={styles.title}>
        <IconHistory className={styles.titleIcon} viewBox="0 0 34 32" />
        <span>History</span>
      </div>
      <History onCloseModal={onCloseModal} />
    </div>
  );
}
