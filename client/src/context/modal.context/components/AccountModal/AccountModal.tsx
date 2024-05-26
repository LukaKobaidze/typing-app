import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '@/context/profile.context';
import {
  IconAccount,
  IconCustomize,
  IconGithub,
  IconGoogle,
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

  const serverUrl = import.meta.env.PROD
    ? import.meta.env.VITE_SERVER_URL
    : 'http://localhost:8080';
  const githubClientId: string | undefined = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const googleClientId: string | undefined = import.meta.env.VITE_GOOGLE_CLIENT_ID;

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

      {(googleClientId || githubClientId) && (
        <>
          <div className={styles.dividerText}>
            <div className={styles.dividerTextContent}>
              <div>or</div>
              <div>Continue with</div>
            </div>
          </div>

          <div className={styles.oauthWrapper}>
            {googleClientId && (
              <a
                className={`${styles.oauthLink} ${styles.oauthLinkGoogle}`}
                href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${serverUrl}/auth/google/access-token&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile&state=google`}
              >
                <IconGoogle className={styles.oauthLinkIcon} />
                <span>Google</span>
              </a>
            )}
            {githubClientId && (
              <a
                className={`${styles.oauthLink} ${styles.oauthLinkGithub}`}
                href={`https://github.com/login/oauth/authorize?client_id=${githubClientId}&state=github`}
              >
                <IconGithub className={styles.oauthLinkIcon} />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </>
      )}

      {tab === 'create-account' && (
        <>
          <div className={styles.dividerText}>
            <div className={styles.dividerTextContent}>
              <div>Account benefits</div>
            </div>
          </div>

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
        </>
      )}
    </Modal>
  );
}
