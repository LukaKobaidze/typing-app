import { useEffect, useState, useCallback, useContext, useMemo } from 'react';
import { RacePlayerState, RaceStateType, TypingResult } from '@/types';
import Typing from '@/components/Typing';
import socket from '@/socket-connection';
import { TypingContext } from '@/context/typing.context';
import Results from './Results';
import { IconUser } from '@/assets/image';
import { CopyButton, Loading } from '@/components/UI';
import styles from '@/styles/Race/Race.module.scss';

interface Props {
  roomCode: string;
}

let countdownInterval: NodeJS.Timer;

export default function Race(props: Props) {
  const { roomCode } = props;

  const { onTypingStarted } = useContext(TypingContext);
  const [roomState, setRoomState] = useState<RaceStateType | null>(null);
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
      socket.emit('leave-room');
    };
  }, []);

  useEffect(() => {
    socket.on('room-state', (argRoomState: RaceStateType) => {
      setRoomState(argRoomState);
    });

    socket.on('test-text', (text) => {
      setRoomState((state) => (!state ? null : { ...state, testText: text }));
    });

    socket.on('players-state', (playersState: RaceStateType['players']) => {
      setRoomState((state) =>
        state === null ? null : { ...state, players: playersState }
      );
    });

    socket.on(
      'caret-position-change',
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

    socket.on('typing-starts-in', (ms: number) => {
      setStartsInSeconds(Math.max(Math.ceil(ms / 1000), 1));
    });

    socket.on('typing-started', () => {
      clearInterval(countdownInterval);
      setStartsInSeconds(0);
      onTypingStarted();
    });

    socket.on('opponent-play-again', () => {
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

    socket.on('opponent-disconnected', () => {
      setRoomState((state) => {
        if (!state) return null;

        return {
          ...state,
          players: {
            ...state.players,
            [opponentPlayer]: {
              ...state.players[opponentPlayer],
              disconnected: true,
            } as RacePlayerState,
          },
        };
      });
    });

    return () => {
      socket.off('room-state');
      socket.off('test-text');
      socket.off('players-state');
      socket.off('caret-position-change');
      socket.off('typing-starts-in');
      socket.off('typing-started');
      socket.off('opponent-play-again');
      socket.off('opponent-disconnected');
    };
  }, [onTypingStarted, opponentPlayer, currentPlayer]);

  const handleCaretPositionChange = useCallback(
    (wordIndex: number, charIndex: number) => {
      socket.emit('caret-position-change', { wordIndex, charIndex });
    },
    []
  );

  const handleResult = useCallback(
    (result: TypingResult) => {
      socket.emit('result', result);

      setRoomState((state) => {
        if (!state) return null;

        return {
          ...state,
          players: {
            ...state.players,
            [currentPlayer]: {
              ...state.players[currentPlayer],
              result,
            } as RacePlayerState,
          },
        };
      });
    },
    [currentPlayer]
  );

  const handlePlayAgain = useCallback(() => {
    socket.emit('play-again');

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
        (roomState.players.player1?.result ||
          roomState.players.player1?.disconnected) &&
        (roomState.players.player2.result ||
          roomState.players.player2.disconnected) ? (
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
              testText={roomState!.testText || ''}
              typeModeCustom={`quote ${roomState.quoteLength}`}
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
