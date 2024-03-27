import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '@/context/profile.context';
import { IconAccount } from '@/assets/image';
import Modal from '@/components/UI/Modal';
import Profile from './Profile';
import AccountSettings from './AccountSettings';
import styles from './UserModal.module.scss';

interface Props {
  onClose: () => void;
}

export default function UserModal({ onClose }: Props) {
  const { profile } = useContext(ProfileContext);

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!profile.username) {
      onClose();
    }
  }, [profile.username]);

  return (
    <Modal
      HeadingIcon={IconAccount}
      heading={profile.username}
      onClose={onClose}
      className={styles.modal}
    >
      <div className={styles.tabs}>
        <button
          className={`${styles.tabsButton} ${activeTab === 0 ? styles.active : ''}`}
          onClick={() => setActiveTab(0)}
        >
          Profile
        </button>
        <button
          className={`${styles.tabsButton} ${activeTab === 1 ? styles.active : ''}`}
          onClick={() => setActiveTab(1)}
        >
          Account Settings
        </button>
      </div>
      {activeTab === 0 ? <Profile onCloseModal={onClose} /> : <AccountSettings />}
    </Modal>
  );
}
