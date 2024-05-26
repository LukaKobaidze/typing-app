import { useContext } from 'react';
import { ProfileContext } from '@/context/profile.context';
import { TypingContext } from '@/context/typing.context';
import { ModalContext } from '@/context/modal.context';
import { Icon1v1, IconAccount, IconCustomize, IconLeave } from '@/assets/image';
import { ButtonRounded, Loading, Logo } from '../UI';
import styles from './Header.module.scss';

interface Props {
  windowWidth: number;
  roomCode: string | null;
  onLogoClick: () => void;
  onLeaveRoom: () => void;
}

export default function Header(props: Props) {
  const { windowWidth, roomCode, onLogoClick, onLeaveRoom } = props;

  const { activeModal, onOpenModal } = useContext(ModalContext);
  const { typingFocused } = useContext(TypingContext);
  const { profile, loadingUser } = useContext(ProfileContext);

  return (
    <header className={styles.header}>
      <div className={styles.headerLogoButtonsWrapper}>
        <div onClick={() => onLogoClick()}>
          <Logo colored={!typingFocused} />
        </div>
        <div
          className={`opacity-transition ${typingFocused ? 'hide' : ''} ${
            styles.headerButtons
          }`}
        >
          <ButtonRounded
            className={styles.headerBtn}
            onClick={() => onOpenModal({ modal: 'customize' })}
            active={activeModal?.modal === 'customize'}
          >
            <IconCustomize />
            {windowWidth > 600 && <span>Customize</span>}
          </ButtonRounded>

          {!roomCode ? (
            <ButtonRounded
              className={styles.headerBtn}
              onClick={() => onOpenModal({ modal: 'oneVersusOne' })}
              active={activeModal?.modal === 'oneVersusOne'}
            >
              <Icon1v1 className={styles.oneVersusOneIcon} />
              {windowWidth > 510 && <span>1v1 (Multiplayer)</span>}
            </ButtonRounded>
          ) : (
            <ButtonRounded
              className={styles.headerBtn}
              onClick={() => onLeaveRoom()}
            >
              <IconLeave />
              {windowWidth > 510 && <span>Leave Room</span>}
            </ButtonRounded>
          )}

          {profile.username ? (
            <ButtonRounded
              className={`${styles.headerBtn} ${styles.accountBtn}`}
              onClick={() => onOpenModal({ modal: 'user' })}
            >
              <IconAccount className={styles.accountBtnIcon} />
              <span className={styles.accountBtnText}>{profile.username}</span>
            </ButtonRounded>
          ) : (
            <ButtonRounded
              className={`${styles.headerBtn} ${styles.accountBtn}`}
              onClick={() => onOpenModal({ modal: 'account' })}
              active={activeModal?.modal === 'account'}
              disabled={loadingUser}
            >
              <IconAccount className={styles.accountBtnIcon} />

              {windowWidth > 575 &&
                (loadingUser ? (
                  <Loading type="spinner" className={styles.loadingUserSpinner} />
                ) : (
                  <span>Account</span>
                ))}
            </ButtonRounded>
          )}
        </div>
      </div>
    </header>
  );
}
