import { useState, useEffect } from 'react';
import { ButtonRounded, Modal } from 'components/UI';
import socket from 'socket-connection';
import styles from 'styles/RaceButtonAndModal/RaceModal.module.scss';
import { IconAlertCircle } from 'assets/image';

interface Props {
  isSocketConnected: boolean;
  onCloseModal: () => void;
}

export default function RaceModal(props: Props) {
  const { isSocketConnected, onCloseModal } = props;

  const [inputCode, setInputCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);

  const onCreateRoom = () => {
    socket.emit('createRoom');
  };

  const onJoinRoom = () => {
    if (inputCode.length !== 6) return;

    setCodeLoading(true);
    socket.emit('joinRoom', inputCode);
  };

  useEffect(() => {
    socket.on('joinRoomError', () => {
      setCodeLoading(false);
      setCodeError(true);
    });

    return () => {
      socket.off('joinRoomError');
    };
  }, []);

  return (
    <Modal heading="Race 1v1" className={styles.modal} onCloseModal={onCloseModal}>
      {!isSocketConnected && (
        <div className={styles.serverErrorMessage}>
          <IconAlertCircle className={styles.serverErrorMessageIcon} />
          <span>Couldn't connect to the server. Try again later</span>
        </div>
      )}
      <div
        className={styles.wrapper}
        style={!isSocketConnected ? { opacity: 0.7 } : undefined}
      >
        <div className={`${styles.box} ${styles.boxCreate}`}>
          <h2 className={styles.heading}>Create</h2>
          <ButtonRounded
            variant="2"
            disabled={!isSocketConnected}
            onClick={onCreateRoom}
          >
            Create Room
          </ButtonRounded>
        </div>
        <div className={styles.or}>or</div>
        <div className={`${styles.box} ${styles.boxJoin}`}>
          <h2 className={styles.heading}>Join</h2>
          <form
            className={styles.joinForm}
            onSubmit={(e) => {
              e.preventDefault();
              onJoinRoom();
            }}
          >
            <div className={styles.inputWrapper}>
              <input
                value={inputCode}
                className={`${styles.input} ${codeError ? styles.error : ''}`}
                onChange={(e) => {
                  if (e.target.value.length > 6) return;

                  setInputCode(e.target.value.toUpperCase());
                  setCodeError(false);
                }}
                placeholder="Enter code..."
              />
              <span className={styles.inputCounter}>{inputCode.length}/6</span>
            </div>
            <ButtonRounded
              variant="2"
              className={styles.joinButton}
              onClick={onJoinRoom}
              disabled={!isSocketConnected || inputCode.length !== 6}
              loading={codeLoading}
            >
              Join
            </ButtonRounded>
            {codeError && <span className={styles.errorMessage}>Invalid code</span>}
          </form>
        </div>
      </div>
    </Modal>
  );
}
