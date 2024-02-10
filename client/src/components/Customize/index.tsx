import { IconCustomize } from '@/assets/image';
import { ButtonRounded, Tooltip } from '@/components/UI';
import CustomizeModal from './CustomizeModal';
import styles from '@/styles/Customize/Customize.module.scss';

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  windowWidth: number;
  classNameButton?: string;
}

export default function Customize(props: Props) {
  const { isOpen, onOpen, onClose, windowWidth, classNameButton } = props;

  return (
    <>
      {windowWidth > 770 ? (
        <ButtonRounded
          className={classNameButton || ''}
          onClick={onOpen}
          active={isOpen}
        >
          <IconCustomize />
          <span>Customize</span>
        </ButtonRounded>
      ) : (
        <Tooltip text="Customize" showOnHover>
          <ButtonRounded
            className={classNameButton || ''}
            onClick={onOpen}
            aria-label="customize"
          >
            <IconCustomize />
          </ButtonRounded>
        </Tooltip>
      )}

      {isOpen && <CustomizeModal onCloseModal={onClose} />}
    </>
  );
}
