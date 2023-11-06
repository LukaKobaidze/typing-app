import { IconSpeed } from '@/assets/image';
import { ButtonRounded } from '@/components/UI';
import RaceModal from './RaceModal';

interface Props {
  isModalOpen: boolean;
  isSocketConnected: boolean;
  onModalOpen: () => void;
  onModalClose: () => void;
  windowWidth: number;
  classNameButton?: string;
}

export default function RaceButtonAndModal(props: Props) {
  const {
    isModalOpen,
    isSocketConnected,
    onModalOpen,
    onModalClose,
    windowWidth,
    classNameButton,
  } = props;

  return (
    <>
      <ButtonRounded
        className={`${classNameButton}`}
        onClick={() => onModalOpen()}
        active={isModalOpen}
      >
        <IconSpeed />
        <span>Race{windowWidth > 585 ? ' (1v1)' : ''}</span>
      </ButtonRounded>
      {isModalOpen && (
        <RaceModal
          isSocketConnected={isSocketConnected}
          onCloseModal={onModalClose}
        />
      )}
    </>
  );
}
