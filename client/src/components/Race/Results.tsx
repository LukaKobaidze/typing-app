import { useState } from 'react';
import { RaceStateType } from 'shared/types';
import Result from '@/components/Typing/Result';
import { ButtonRounded } from '@/components/UI';
import { IconRefresh, IconTrophy } from '@/assets/image';
import styles from '@/styles/Race/Results.module.scss';

interface Props {
  playersState: RaceStateType['players'];
  currentPlayer: 'player1' | 'player2';
  opponentPlayer: 'player1' | 'player2';
  onPlayAgain: () => void;
}

export default function Results(props: Props) {
  const { playersState, currentPlayer, opponentPlayer, onPlayAgain } = props;

  const wpmYou =
    playersState[currentPlayer]!.result!.timeline[
      playersState[currentPlayer]!.result!.timeline.length - 1
    ].wpm;
  const wpmOpponent =
    playersState[opponentPlayer]!.result!.timeline[
      playersState[opponentPlayer]!.result!.timeline.length - 1
    ].wpm;

  const [showPlayerResult, setShowPlayerResult] = useState<'player1' | 'player2'>(
    currentPlayer
  );

  const winner =
    wpmYou > wpmOpponent
      ? currentPlayer
      : wpmOpponent > wpmYou
      ? opponentPlayer
      : null;

  return (
    <>
      <span
        className={`${styles.winnerText} ${
          winner === currentPlayer
            ? styles.winnerTextWon
            : winner === opponentPlayer
            ? styles.winnerTextLost
            : ''
        }`}
      >
        {!winner ? 'Tie!' : winner === currentPlayer ? 'You Won!' : 'You Lost!'}
      </span>
      <div className={styles.playerResultButtonsWrapper}>
        <div className={styles.playerResultButtons}>
          <ButtonRounded
            className={`${styles.playerResultButtonsBtn} ${
              currentPlayer === showPlayerResult ? styles.active : ''
            }`}
            onClick={() => setShowPlayerResult(currentPlayer)}
          >
            {winner === currentPlayer && (
              <IconTrophy className={styles.iconTrophy} />
            )}
            <span>You</span>
          </ButtonRounded>
          <ButtonRounded
            className={`${styles.playerResultButtonsBtn} ${
              opponentPlayer === showPlayerResult ? styles.active : ''
            }`}
            onClick={() => setShowPlayerResult(opponentPlayer)}
          >
            {winner === opponentPlayer && (
              <IconTrophy className={styles.iconTrophy} />
            )}
            <span>Opponent</span>
          </ButtonRounded>
        </div>
      </div>

      <Result result={playersState[showPlayerResult]!.result!} />

      <div className={styles.playAgainWrapper}>
        <ButtonRounded
          variant="2"
          className={styles.playAgain}
          onClick={onPlayAgain}
          disabled={playersState[currentPlayer]?.playAgain}
        >
          <IconRefresh className={styles.playAgainIcon} />
          <span>Play Again</span>
        </ButtonRounded>
        <span className={styles.playAgainText}>
          {playersState[opponentPlayer]?.playAgain
            ? 'Opponent wants to play again!'
            : playersState[currentPlayer]?.playAgain
            ? 'Play again requested to your opponent!'
            : ''}
        </span>
      </div>
    </>
  );
}
