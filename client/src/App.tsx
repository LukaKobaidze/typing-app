import { useState, useEffect, useContext } from 'react';
import socket from '@/socket-connection';
import { TypingContext } from '@/context/typing.context';
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
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const { typingStarted } = useContext(TypingContext);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [previewResult, setPreviewResult] = useState<TypingResult | null>(null);
  const [windowWidth] = useWindowDimensions();

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

  return (
    <>
      <Header
        windowWidth={windowWidth}
        roomCode={roomCode}
        isSocketConnected={isSocketConnected}
        onLogoClick={() => setPreviewResult(null)}
        onUpdateRoomCode={(roomCode) => setRoomCode(roomCode)}
      />
      <Typemode
        className={`opacity-transition ${typingStarted ? 'hide' : ''} ${
          styles.typemode
        }`}
      />

      <main className={styles.main}>
        <div className={styles.mainContent}>
          {roomCode ? (
            <Race roomCode={roomCode} />
          ) : (
            <>
              {previewResult ? (
                <Result
                  result={previewResult}
                  onGoBack={() => setPreviewResult(null)}
                  includeDate
                />
              ) : (
                <Typing />
              )}
            </>
          )}
        </div>
      </main>

      <Footer
        roomCode={roomCode}
        onPreviewResult={(result) => setPreviewResult(result)}
      />
    </>
  );
}
