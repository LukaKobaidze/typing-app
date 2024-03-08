import { ButtonRounded } from '@/components/UI';
import Modal from '../Modal';
import styles from './AccountModal.module.scss';
import { IconAccount } from '@/assets/image';
import { useState } from 'react';
import CreateAccount from './CreateAccount';
import LogIn from './LogIn';

interface Props {
  onClose: () => void;
}

export default function AccountModal(props: Props) {
  const { onClose } = props;

  const [tab, setTab] = useState<'create-account' | 'log-in'>('create-account');

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
