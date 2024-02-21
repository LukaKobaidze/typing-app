import { useContext, useEffect, useState } from 'react';
import socket from '@/socket-connection';
import { TypingContext } from '@/context/typing.context';
import { ButtonRounded, Logo } from '../UI';
import Customize from '../Customize';
import Stats from '../Stats';
import RaceButtonAndModal from '../RaceButtonAndModal';
import Typemode from '../Typemode';
import styles from '@/styles/Header/Header.module.scss';

interface Props {
  windowWidth: number;
  roomCode: string | null;
  isSocketConnected: boolean;
  onLogoClick: () => void;
  onUpdateRoomCode: (roomCode: string | null) => void;
}

type ModalOpenType = 'customize' | 'stats' | 'race' | null;

export default function Header(props: Props) {
  const { windowWidth, isSocketConnected, roomCode, onLogoClick, onUpdateRoomCode } =
    props;

  const { typingFocused, onTypingDisable, onTypingAllow } =
    useContext(TypingContext);
  const [modalOpen, setModalOpen] = useState<ModalOpenType>(null);

  const updateModalOpen = (newState: ModalOpenType) => {
    if (typingFocused) return;

    setModalOpen(newState);
  };

  const isRaceModalOpen = modalOpen === 'race';

  useEffect(() => {
    if (isRaceModalOpen) {
      socket.on('has-joined-room', (roomCode: string) => {
        onUpdateRoomCode(roomCode);
        setModalOpen(null);
      });
    }
  }, [isRaceModalOpen]);

  useEffect(() => {
    if (modalOpen) {
      onTypingDisable();
    } else {
      onTypingAllow();
    }
  }, [modalOpen]);

  useEffect(() => {
    if (typingFocused) {
      setModalOpen(null);
    }
  }, [typingFocused]);

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
          <Customize
            classNameButton={`${styles.headerBtn} ${styles.customize}`}
            isOpen={modalOpen === 'customize'}
            onOpen={() => updateModalOpen('customize')}
            onClose={() => updateModalOpen(null)}
            windowWidth={windowWidth}
          />
          <Stats
            classNameButton={`${styles.headerBtn} ${styles.customize}`}
            isOpen={modalOpen === 'stats'}
            onOpen={() => updateModalOpen('stats')}
            onClose={() => updateModalOpen(null)}
            windowWidth={windowWidth}
          />

          {!roomCode && (
            <RaceButtonAndModal
              isModalOpen={modalOpen === 'race'}
              onModalOpen={() => updateModalOpen('race')}
              onModalClose={() => updateModalOpen(null)}
              windowWidth={windowWidth}
              classNameButton={styles.headerBtn}
              isSocketConnected={isSocketConnected}
            />
          )}
        </div>
      </div>
      {roomCode ? (
        <ButtonRounded variant="2" onClick={() => onUpdateRoomCode(null)}>
          Leave Room
        </ButtonRounded>
      ) : (
        <></>
        // <Typemode
        //   className={`opacity-transition ${typingFocused ? 'hide' : ''}`}
        //   hidden={typingFocused}
        // />
      )}
    </header>
  );
}
