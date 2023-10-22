import { ButtonRounded } from 'components/UI';
import RaceModal from './RaceModal';
import { IconSpeed } from 'assets/image';
import styles from 'styles/RaceButtonAndModal/RaceButtonAndModal.module.scss';

interface Props {
  isModalOpen: boolean;
  onModalOpen: () => void;
  onModalClose: () => void;
  windowWidth: number;
  classNameButton?: string;
}

export default function RaceButtonAndModal(props: Props) {
  const { isModalOpen, onModalOpen, onModalClose, windowWidth, classNameButton } =
    props;

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
      {isModalOpen && <RaceModal onCloseModal={onModalClose} />}
    </>
  );
}
