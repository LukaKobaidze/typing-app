import { useState, useEffect } from 'react';
import socket from '@/socket-connection';
import { useWindowDimensions } from '@/hooks';
import { TypingResult } from '@/types';
import Header from './components/Header';
import Result from '@/components/Typing/Result';
import Typing from '@/components/Typing';
import Race from '@/components/Race';
import Footer from './components/Footer';

export default function App() {
  const [isSocketConnected, setIsSocketConnected] = useState(false);

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

      <main>
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
      </main>

      <Footer
        roomCode={roomCode}
        onPreviewResult={(result) => setPreviewResult(result)}
      />
    </>
  );
}
