import { ButtonRounded } from '@/components/UI';
import styles from './AccountSettings.module.scss';
import { useContext } from 'react';
import { ProfileContext } from '@/context/profile.context';
import { logOut } from '@/api/auth';
import { IconPassword, IconUsername } from '@/assets/image';

export default function AccountSettings() {
  const { onClearProfile } = useContext(ProfileContext);

  const handleLogOut = () => {
    logOut().then(() => {
      onClearProfile();
    });
  };

  return (
    <div className={styles.container}>
      <ButtonRounded className={styles.button}>
        <IconUsername className={styles.buttonIcon} />
        <span>Change username</span>
      </ButtonRounded>
      <ButtonRounded className={styles.button}>
        <IconPassword className={styles.buttonIcon} />
        <span>Change password</span>
      </ButtonRounded>
      <ButtonRounded className={styles.logOut} onClick={() => handleLogOut()}>
        Log Out
      </ButtonRounded>
    </div>
  );
}
