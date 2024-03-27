import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '@/context/profile.context';
import { IconAccount } from '@/assets/image';
import Modal from '@/components/UI/Modal';
import CreateAccount from './CreateAccount';
import LogIn from './LogIn';
import styles from './AccountModal.module.scss';

interface Props {
  onClose: () => void;
}

export default function AccountModal(props: Props) {
  const { onClose } = props;

  const { profile } = useContext(ProfileContext);
  const [tab, setTab] = useState<'create-account' | 'log-in'>('create-account');

  useEffect(() => {
    if (profile.username) {
      onClose();
    }
  }, [profile]);

  return (
    <Modal
      HeadingIcon={IconAccount}
      heading="Account"
      onClose={onClose}
      className={styles.modal}
    >
      <div className={styles.topContainer}>
        <button
          className={`${styles.topContainerButtons} ${
            tab === 'create-account' ? styles.active : ''
          }`}
          onClick={() => setTab('create-account')}
        >
          Create Account
        </button>
        <button
          className={`${styles.topContainerButtons} ${
            tab === 'log-in' ? styles.active : ''
          }`}
          onClick={() => setTab('log-in')}
        >
          Log In
        </button>
      </div>

      {tab === 'create-account' ? <CreateAccount /> : <LogIn />}
    </Modal>
  );
}
