import { useState, useContext, useEffect } from 'react';
import socket from '@/api/socket';
import { TypingContext } from '@/context/typing.context';
import { ModalContext } from '@/context/modal.context';
import { useWindowDimensions } from '@/hooks';
import { TypingResult } from '@/types';
import Header from '@/components/Header';
import Result from '@/components/Typing/Result';
import Typing from '@/components/Typing';
import Race from '@/components/Race';
import Footer from '@/components/Footer';
import Typemode from '@/components/Typemode';
import styles from '@/styles/App.module.scss';

export default function App() {
  const { typingFocused, resultPreview, onPreviewResult } =
    useContext(TypingContext);
  const { activeModal, onOpenModal } = useContext(ModalContext);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [windowWidth] = useWindowDimensions();

  useEffect(() => {
    if (activeModal === 'race') {
      socket.on('has-joined-room', (roomCode: string) => {
        setRoomCode(roomCode);
        onOpenModal(null);
      });
    }

    return () => {
      socket.off('has-joined-room');
    };
  }, [activeModal]);

  return (
    <>
      <Header
        windowWidth={windowWidth}
        roomCode={roomCode}
        onLogoClick={() => onPreviewResult(null)}
        onLeaveRoom={() => setRoomCode(null)}
      />

      {!roomCode && (
        <Typemode
          className={`opacity-transition ${typingFocused ? 'hide' : ''} ${
            styles.typemode
          }`}
        />
      )}

      <main
        className={`${styles.main} ${
          !roomCode ? styles.mainMarginBottom : ''
        }`}
      >
        {roomCode ? (
          <Race roomCode={roomCode} />
        ) : (
          <>
            {resultPreview ? (
              <Result
                result={resultPreview}
                onGoBack={() => onPreviewResult(null)}
                includeDate
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
