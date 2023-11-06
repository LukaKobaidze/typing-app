import { useEffect, useState, useCallback, useContext, useMemo } from 'react';
import { RacePlayerState, RaceStateType, SocketEvent } from 'shared/types';
import Typing from '@/components/Typing';
import socket from '@/socket-connection';
import { TypingResult } from 'shared/types';
import { GlobalContext } from '@/context/global.context';
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

  const { onTypingStart } = useContext(GlobalContext);
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
      socket.emit(SocketEvent.LeaveRoom);
    };
  }, []);

  useEffect(() => {
    socket.on(SocketEvent.RoomState, (argRoomState: RaceStateType) => {
      setRoomState(argRoomState);
    });

    socket.on(SocketEvent.TestText, (text) => {
      setRoomState((state) => (!state ? null : { ...state, testText: text }));
    });

    socket.on(SocketEvent.PlayersState, (playersState: RaceStateType['players']) => {
      setRoomState((state) =>
        state === null ? null : { ...state, players: playersState }
      );
    });

    socket.on(
      SocketEvent.CaretPositionChange,
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

    socket.on(SocketEvent.TypingStartsIn, (ms: number) => {
      setStartsInSeconds(Math.max(Math.ceil(ms / 1000), 1));
    });

    socket.on(SocketEvent.TypingStarted, () => {
      clearInterval(countdownInterval);
      setStartsInSeconds(0);
      onTypingStart();
    });

    socket.on(SocketEvent.OpponentPlayAgain, () => {
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
      socket.off(SocketEvent.RoomState);
      socket.off(SocketEvent.TestText);
      socket.off(SocketEvent.PlayersState);
      socket.off(SocketEvent.CaretPositionChange);
      socket.off(SocketEvent.TypingStartsIn);
      socket.off(SocketEvent.TypingStarted);
      socket.off(SocketEvent.OpponentPlayAgain);
    };
  }, [onTypingStart, opponentPlayer, currentPlayer]);

  const handleCaretPositionChange = useCallback(
    (wordIndex: number, charIndex: number) => {
      socket.emit(SocketEvent.CaretPositionChange, { wordIndex, charIndex });
    },
    []
  );

  const handleResult = useCallback((result: TypingResult) => {
    socket.emit(SocketEvent.Result, result);
  }, []);

  const handlePlayAgain = useCallback(() => {
    socket.emit(SocketEvent.PlayAgain);

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
