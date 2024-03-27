import { useState, useEffect } from 'react';
import { QuoteLengthType } from '@/types';
import socket from '@/api/socket';
import { data } from '@/data';
import { Icon1v1, IconAlertCircle } from '@/assets/image';
import { useLocalStorageState } from '@/hooks';
import { ButtonRounded } from '@/components/UI';
import Modal from '@/components/UI/Modal';
import styles from './OneVersusOneModal.module.scss';

interface Props {
  onClose: () => void;
}

export default function OneVersusOneModal(props: Props) {
  const { onClose } = props;

  const [isSocketConnected, setIsSocketConnected] = useState(socket.connected);
  const [inputCode, setInputCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);
  const [quoteLength, setQuoteLength] = useLocalStorageState<QuoteLengthType>(
    '1v1-quote-length',
    'medium'
  );

  useEffect(() => {
    socket.on('connect', () => {
      setIsSocketConnected(true);
    });

    socket.on('disconnect', () => {
      setIsSocketConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const onCreateRoom = () => {
    socket.emit('create-room', quoteLength);
  };

  const onJoinRoom = () => {
    if (inputCode.length !== 6) return;

    setCodeLoading(true);
    socket.emit('join-room', inputCode);
  };

  useEffect(() => {
    socket.on('join-room-error', () => {
      setCodeLoading(false);
      setCodeError(true);
    });

    return () => {
      socket.off('join-room-error');
    };
  }, []);

  useEffect(() => {
    setCodeLoading(false);
  }, [isSocketConnected]);

  return (
    <Modal
      HeadingIcon={Icon1v1}
      heading="1v1"
      className={styles.modal}
      onClose={onClose}
    >
      {!isSocketConnected && (
        <div className={styles.serverErrorMessage}>
          <IconAlertCircle className={styles.serverErrorMessageIcon} />
          <span>Trying to connect to the server...</span>
        </div>
      )}
      <div
        className={styles.wrapper}
        style={!isSocketConnected ? { opacity: 0.7 } : undefined}
      >
        <div className={`${styles.box} ${styles.boxCreate}`}>
          <h2 className={styles.heading}>Create</h2>

          <div className={styles.setting}>
            <h3 className={styles.settingHeading}>Qoute Length</h3>
            <div className={styles.settingButtonOptions}>
              {data.typemode.quote.map((quoteLengthCurrent) => (
                <ButtonRounded
                  key={quoteLengthCurrent}
                  onClick={() => setQuoteLength(quoteLengthCurrent)}
                  className={styles.settingButton}
                  active={quoteLengthCurrent === quoteLength}
                >
                  {quoteLengthCurrent}
                </ButtonRounded>
              ))}
            </div>
          </div>

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
