import { useContext, useState } from 'react';
import { ProfileContext } from '@/context/profile.context';
import { httpLogOut } from '@/api/auth';
import {
  IconHistory,
  IconKeyboardArrowLeft,
  IconLeave,
  IconPassword,
  IconStats,
  IconUsername,
} from '@/assets/image';
import { ButtonRounded, Tooltip } from '@/components/UI';
import ClearHistory from './ClearHistory';
import ResetStats from './ResetStats';
import ChangeUsername from './ChangeUsername';
import ChangePassword from './ChangePassword';
import styles from './AccountSettings.module.scss';

export default function AccountSettings() {
  const { onLogOut } = useContext(ProfileContext);

  const [currentTab, setCurrentTab] = useState<keyof typeof tabs | null>(null);

  const handleLogOut = () => {
    httpLogOut().then(() => {
      onLogOut();
    });
  };

  const handleGoBack = () => {
    setCurrentTab(null);
  };

  const tabs = {
    'Clear history': {
      icon: (
        <IconHistory
          viewBox="0 0 39 39"
          className={`${styles.buttonIcon} ${styles.iconHistory}`}
        />
      ),
      content: <ClearHistory onGoBack={handleGoBack} />,
    },
    'Reset stats': {
      icon: <IconStats className={styles.buttonIcon} />,
      content: <ResetStats onGoBack={handleGoBack} />,
    },
    'Change username': {
      icon: <IconUsername className={styles.buttonIcon} />,
      content: <ChangeUsername onGoBack={handleGoBack} />,
    },
    'Change password': {
      icon: <IconPassword className={styles.buttonIcon} />,
      content: <ChangePassword onGoBack={handleGoBack} />,
    },
  };

  const tabKeys = Object.keys(tabs) as (keyof typeof tabs)[];

  return (
    <div className={styles.container}>
      {!currentTab ? (
        <>
          {tabKeys.map((tab) => (
            <ButtonRounded
              className={styles.button}
              onClick={() => setCurrentTab(tab)}
            >
              {tabs[tab].icon}
              <span>{tab}</span>
            </ButtonRounded>
          ))}
          <ButtonRounded className={styles.logOut} onClick={() => handleLogOut()}>
            <IconLeave className={styles.logOutIcon} />
            <span>Log Out</span>
          </ButtonRounded>
        </>
      ) : (
        <>
          <div className={styles.headingContainer}>
            <Tooltip
              position="right"
              text="go back"
              offset={-5}
              showOnHover
              className={styles.goBackButtonContainer}
            >
              <ButtonRounded
                className={styles.goBackButton}
                onClick={() => handleGoBack()}
              >
                <IconKeyboardArrowLeft className={styles.goBackButtonIcon} />
              </ButtonRounded>
            </Tooltip>

            <h2 className={styles.heading}>
              {tabs[currentTab].icon}
              <span>{currentTab}</span>
            </h2>
          </div>

          {tabs[currentTab].content}
        </>
      )}
    </div>
  );
}
