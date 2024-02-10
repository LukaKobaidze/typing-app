import { IconStats } from '@/assets/image';
import { ButtonRounded, Tooltip } from '@/components/UI';
import StatsModal from './StatsModal';

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  windowWidth: number;
  classNameButton?: string;
}

export default function Stats(props: Props) {
  const { isOpen, onOpen, onClose, windowWidth, classNameButton } = props;

  return (
    <>
      {windowWidth > 770 || (windowWidth < 551 && windowWidth > 370) ? (
        <ButtonRounded
          className={classNameButton || ''}
          onClick={onOpen}
          active={isOpen}
        >
          <IconStats />
          <span>Stats</span>
        </ButtonRounded>
      ) : (
        <Tooltip text="Stats" showOnHover>
          <ButtonRounded
            className={classNameButton || ''}
            onClick={onOpen}
            aria-label="stats"
          >
            <IconStats />
          </ButtonRounded>
        </Tooltip>
      )}

      {isOpen && <StatsModal onCloseModal={onClose} />}
    </>
  );
}
