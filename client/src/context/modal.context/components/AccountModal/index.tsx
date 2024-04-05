import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '@/context/profile.context';
import {
  IconAccount,
  IconCustomize,
  IconGithub,
  IconHistory,
  IconStats,
} from '@/assets/image';
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

  const githubClientId: string | undefined = import.meta.env.VITE_GITHUB_CLIENT_ID;

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
      <div className={styles.orContinueWith}>
        <div className={styles.orContinueWithText}>
          <div>or</div>
          <div>Continue with</div>
        </div>
      </div>

      {githubClientId && (
        <a
          className={styles.oauthLink}
          href={`https://github.com/login/oauth/authorize?client_id=${githubClientId}&state=github`}
        >
          <IconGithub className={styles.oauthLinkIcon} />
          <span>GitHub</span>
        </a>
      )}

      {tab === 'create-account' && (
        <ul className={styles.benefits}>
          <li className={styles.benefitsItem}>
            <IconStats className={styles.benefitsItemIcon} />
            <span>Personal Stats.</span>
          </li>
          <li className={styles.benefitsItem}>
            <IconHistory className={styles.benefitsItemIcon} />
            <span>Previous results (History).</span>
          </li>
          <li className={styles.benefitsItem}>
            <IconCustomize className={styles.benefitsItemIcon} />
            <span>Customizations saved to the account.</span>
          </li>
        </ul>
      )}
    </Modal>
  );
}
