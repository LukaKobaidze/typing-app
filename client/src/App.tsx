import { useState, useContext, useEffect } from 'react';
import socket from '@/api/socket';
import { TypingContext } from '@/context/typing.context';
import { ModalContext } from '@/context/modal.context';
import { useWindowDimensions } from '@/hooks';
import Header from '@/components/Header';
import Result from '@/components/Typing/Result';
import Typing from '@/components/Typing';
import OneVersusOne from '@/components/OneVersusOne';
import Footer from '@/components/Footer';
import Typemode from '@/components/Typemode';
import styles from '@/styles/App.module.scss';

export default function App() {
  const {
    typingFocused,
    resultPreview,
    typemodeVisible,
    onPreviewResult,
    setTypemodeVisible,
  } = useContext(TypingContext);
  const { activeModal, onOpenModal } = useContext(ModalContext);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [windowWidth] = useWindowDimensions();

  useEffect(() => {
    if (activeModal === 'oneVersusOne') {
      socket.on('has-joined-room', (roomCode: string) => {
        setRoomCode(roomCode);
        onOpenModal(null);
      });
    }

    return () => {
      socket.off('has-joined-room');
    };
  }, [activeModal]);

  useEffect(() => {
    setTypemodeVisible(!roomCode);
  }, [roomCode]);

  return (
    <>
      <Header
        windowWidth={windowWidth}
        roomCode={roomCode}
        onLogoClick={() => onPreviewResult(null)}
        onLeaveRoom={() => setRoomCode(null)}
      />

      {typemodeVisible && (
        <Typemode
          className={`opacity-transition ${typingFocused ? 'hide' : ''} ${
            styles.typemode
          }`}
        />
      )}

      <main
        className={`${styles.main} ${
          typemodeVisible ? styles.mainMarginBottom : ''
        }`}
      >
        {roomCode ? (
          <OneVersusOne roomCode={roomCode} />
        ) : (
          <>
            {resultPreview ? (
              <Result
                result={resultPreview.state}
                onGoBack={() => onPreviewResult(null)}
                {...resultPreview.options}
              />
            ) : (
              <Typing />
            )}
          </>
        )}
      </main>

      <Footer
        roomCode={roomCode}
        onPreviewResult={(result) => onPreviewResult(result)}
      />
    </>
  );
}
