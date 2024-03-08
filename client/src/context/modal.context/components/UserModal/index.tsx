import { IconAccount } from '@/assets/image';
import Modal from '../Modal';
import styles from './UserModal.module.scss';
import { useContext, useState } from 'react';
import { ProfileContext } from '@/context/profile.context';

interface Props {
  onClose: () => void;
}

export default function UserModal({ onClose }: Props) {
  const { profile } = useContext(ProfileContext);

  const [activeTab, setActiveTab] = useState(0);

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
    </Modal>
  );
}
