import { IconCustomize } from 'assets/image';
import { ButtonRounded } from 'components/UI';
import CustomizeModal from './CustomizeModal';
import styles from 'styles/Customize/Customize.module.scss';

interface Props {
  isCustomizing: boolean;
  onCustomizeOpen: () => void;
  onCustomizeClose: () => void;
  className?: string;
}

export default function Customize(props: Props) {
  const { isCustomizing, onCustomizeOpen, onCustomizeClose, className } = props;

  return (
    <>
      <ButtonRounded
        className={`${styles.button} ${className || ''}`}
        onClick={onCustomizeOpen}
      >
        <IconCustomize className={styles.buttonIcon} />

        <span>Customize</span>
      </ButtonRounded>

      {isCustomizing && <CustomizeModal onCloseModal={onCustomizeClose} />}
    </>
  );
}
