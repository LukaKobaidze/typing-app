import { useEffect, useState, useCallback, useContext, useMemo } from 'react';
import Typing from '@/components/Typing';
import socket from '@/socket-connection';
import { TypingResult } from '@/components/Typing/types';
import { GlobalContext } from '@/context/global.context';
import Results from './Results';
import { IconUser } from '@/assets/image';
import { CopyButton, Loading } from '@/components/UI';
import styles from '@/styles/Race/Race.module.scss';

export type RoomPlayerState = {
  id: string;
  wordIndex: number;
  charIndex: number;
  result?: TypingResult;
  playAgain?: boolean;
  disconnected?: boolean;
};
export type RoomStateType = {
  players: { player1: RoomPlayerState | null; player2?: RoomPlayerState | null };
  testText: string;
};

interface Props {
  roomCode: string;
}

let countdownInterval: NodeJS.Timer;

export default function Race(props: Props) {
  const { roomCode } = props;

  const { onTypingStart } = useContext(GlobalContext);
  const [roomState, setRoomState] = useState<RoomStateType | null>(null);
  const [startsInSeconds, setStartsInSeconds] = useState<number | null>(null);

  const currentPlayer = useMemo(() => {
    return roomState?.players.player1?.id === socket.id ? 'player1' : 'player2';
  }, [roomState?.players.player1?.id]);
  const opponentPlayer = useMemo(
    () => (currentPlayer === 'player1' ? 'player2' : 'player1'),
    [currentPlayer]
  );

  useEffect(() => {
    return () => {
      socket.emit('leaveRoom');
    };
  }, []);

  useEffect(() => {
    socket.on('roomState', (argRoomState: RoomStateType) => {
      setRoomState(argRoomState);
    });

    socket.on('testText', (text) => {
      setRoomState((state) => (!state ? null : { ...state, testText: text }));
    });

    socket.on('roomPlayersState', (roomPlayersState: RoomStateType['players']) => {
      setRoomState((state) =>
        state === null ? null : { ...state, players: roomPlayersState }
      );
    });

    socket.on(
      'caretPositionChange',
      ({
        player,
        wordIndex,
        charIndex,
      }: {
        player: 'player1' | 'player2';
        wordIndex: number;
        charIndex: number;
      }) => {
        setRoomState((state) => {
          if (!state) return null;

          return {
            ...state,
            players: {
              ...state.players,
              [player]: { ...state.players[player], wordIndex, charIndex },
            },
          };
        });
      }
    );

    socket.on('typingStartsIn', (ms: number) => {
      setStartsInSeconds(Math.max(Math.ceil(ms / 1000), 1));
    });

    socket.on('typingStarted', () => {
      clearInterval(countdownInterval);
      setStartsInSeconds(0);
      onTypingStart();
    });

    socket.on('opponentPlayAgain', () => {
      setRoomState((state) => {
        if (!state) return null;

        return {
          ...state,
          players: {
            ...state.players,
            [opponentPlayer]: { ...state.players[opponentPlayer], playAgain: true },
          },
        };
      });
    });

    return () => {
      socket.off('roomState');
      socket.off('testText');
      socket.off('roomPlayerState');
      socket.off('caretPositionChange');
      socket.off('typingStartsAt');
      socket.off('typingStarted');
      socket.off('opponentPlayAgain');
    };
  }, [onTypingStart, opponentPlayer, currentPlayer]);

  const handleCaretPositionChange = useCallback(
    (wordIndex: number, charIndex: number) => {
      socket.emit('caretPositionChange', { wordIndex, charIndex });
    },
    []
  );

  const handleResult = useCallback((result: TypingResult) => {
    socket.emit('result', result);
  }, []);

  const handlePlayAgain = useCallback(() => {
    socket.emit('playAgain');

    setRoomState((state) => {
      if (!state) return null;

      return {
        ...state,
        players: {
          ...state.players,
          [currentPlayer]: { ...state.players[currentPlayer], playAgain: true },
        },
      };
    });
  }, [currentPlayer]);

  const opponentPlayerState = roomState?.players[opponentPlayer];
  const showResults =
    roomState?.players.player1?.result && roomState?.players.player2?.result;

  useEffect(() => {
    if (showResults) {
      setStartsInSeconds(null);
    }
  }, [showResults]);

  return (
    <>
      {roomState?.players.player2 ? (
        roomState.players.player1?.result && roomState.players.player2.result ? (
          <Results
            playersState={roomState.players}
            currentPlayer={currentPlayer}
            opponentPlayer={opponentPlayer}
            onPlayAgain={handlePlayAgain}
          />
        ) : (
          <div className={styles.typingWrapper}>
            {startsInSeconds !== null && (
              <span
                className={`${styles.countdown} ${
                  !startsInSeconds ? styles.countdownFadeOut : ''
                }`}
              >
                {startsInSeconds || 'GO!'}
              </span>
            )}
            <Typing
              disabled={false}
              testText={roomState!.testText || ''}
              onCaretPositionChange={handleCaretPositionChange}
              secondCaret={{
                wordIndex: opponentPlayerState?.wordIndex || 0,
                charIndex: opponentPlayerState?.charIndex || 0,
              }}
              raceMode
              onResult={handleResult}
            />
          </div>
        )
      ) : (
        <div className={styles.waitingWrapper}>
          <div className={styles.roomCode}>
            <span className={styles.roomCodeText}>Room Code: </span>
            <span className={styles.roomCodeTextCode}>{roomCode}</span>
            <CopyButton className={styles.roomCodeCopyButton} value={roomCode} />
          </div>
          <div className={styles.players}>
            <div className={`${styles.player} ${styles.playerOne}`}>
              <span className={styles.playerText}>You</span>
              <IconUser className={styles.iconUser} />
            </div>
            <span className={styles.textVs}>vs</span>
            <div className={`${styles.player} ${styles.playerTwo}`}>
              <span className={styles.playerText}>Opponent</span>
              <Loading type="dot-flashing" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
