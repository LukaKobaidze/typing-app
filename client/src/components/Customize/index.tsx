import { IconCustomize } from '@/assets/image';
import { ButtonRounded, Tooltip } from '@/components/UI';
import CustomizeModal from './CustomizeModal';
import styles from '@/styles/Customize/Customize.module.scss';

interface Props {
  isCustomizing: boolean;
  onCustomizeOpen: () => void;
  onCustomizeClose: () => void;
  windowWidth: number;
  classNameButton?: string;
}

export default function Customize(props: Props) {
  const {
    isCustomizing,
    onCustomizeOpen,
    onCustomizeClose,
    windowWidth,
    classNameButton,
  } = props;

  return (
    <>
      {windowWidth > 770 ? (
        <ButtonRounded
          className={classNameButton || ''}
          onClick={onCustomizeOpen}
          active={isCustomizing}
        >
          <IconCustomize className={styles.buttonIcon} />
          <span>Customize</span>
        </ButtonRounded>
      ) : (
        <Tooltip text="Customize" showOnHover>
          <ButtonRounded
            className={classNameButton || ''}
            onClick={onCustomizeOpen}
            aria-label="customize"
          >
            <IconCustomize />
          </ButtonRounded>
        </Tooltip>
      )}

      {isCustomizing && <CustomizeModal onCloseModal={onCustomizeClose} />}
    </>
  );
}
