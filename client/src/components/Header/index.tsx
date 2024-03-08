import { useContext, useEffect, useState } from 'react';
import socket from '@/api/socket';
import { TypingContext } from '@/context/typing.context';
import { ButtonRounded, Logo, Tooltip } from '../UI';
import { ModalContext } from '@/context/modal.context';
import {
  IconAccount,
  IconCustomize,
  IconLeaveRoom,
  IconSpeed,
} from '@/assets/image';
import styles from '@/styles/Header/Header.module.scss';
import { ProfileContext } from '@/context/profile.context';

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
  const { profile } = useContext(ProfileContext);

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
          {windowWidth > 770 ? (
            <ButtonRounded
              className={styles.headerBtn}
              onClick={() => onOpenModal('customize')}
              active={activeModal === 'customize'}
            >
              <IconCustomize />
              <span>Customize</span>
            </ButtonRounded>
          ) : (
            <Tooltip text="Customize" showOnHover>
              <ButtonRounded
                className={styles.headerBtn}
                onClick={() => onOpenModal('customize')}
                aria-label="customize"
              >
                <IconCustomize />
              </ButtonRounded>
            </Tooltip>
          )}

          {!roomCode ? (
            <ButtonRounded
              className={styles.headerBtn}
              onClick={() => onOpenModal('race')}
              active={activeModal === 'race'}
            >
              <IconSpeed />
              <span>Race{windowWidth > 585 ? ' (1v1)' : ''}</span>
            </ButtonRounded>
          ) : (
            <ButtonRounded
              className={styles.headerBtn}
              onClick={() => onLeaveRoom()}
            >
              <IconLeaveRoom />
              <span>Leave Room</span>
            </ButtonRounded>
          )}

          {profile.username ? (
            <ButtonRounded
              className={`${styles.headerBtn} ${styles.accountBtn}`}
              onClick={() => onOpenModal('user')}
            >
              <IconAccount />
              <span>{profile.username}</span>
            </ButtonRounded>
          ) : (
            <ButtonRounded
              className={`${styles.headerBtn} ${styles.accountBtn}`}
              onClick={() => onOpenModal('account')}
              active={activeModal === 'account'}
            >
              <IconAccount />
              <span>Account</span>
            </ButtonRounded>
          )}
        </div>
      </div>
    </header>
  );
}
