import { IconStats } from 'assets/image';
import { ButtonRounded, Tooltip } from 'components/UI';
import StatsModal from './StatsModal';

interface Props {
  isOpen: boolean;
  onStatsOpen: () => void;
  onStatsClose: () => void;
  windowWidth: number;
  classNameButton?: string;
}

export default function Stats(props: Props) {
  const { isOpen, onStatsOpen, onStatsClose, windowWidth, classNameButton } = props;

  return (
    <>
      {windowWidth > 650 || (windowWidth < 551 && windowWidth > 370) ? (
        <ButtonRounded className={classNameButton || ''} onClick={onStatsOpen}>
          <IconStats />
          <span>Stats</span>
        </ButtonRounded>
      ) : (
        <Tooltip text="Stats" showOnHover>
          <ButtonRounded
            className={classNameButton || ''}
            onClick={onStatsOpen}
            aria-label="stats"
          >
            <IconStats />
          </ButtonRounded>
        </Tooltip>
      )}

      {isOpen && <StatsModal onCloseModal={onStatsClose} />}
    </>
  );
}
