import styles from '@/styles/Typemode/Column.module.scss';
import { TextButton } from '../UI';
import { useEffect, useState } from 'react';

export interface ColumnProps {
  buttons: {
    text: string | number;
    active: boolean;
    action: () => void;
    Icon?: React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
      }
    >;
  }[];
}

export default function Column(props: ColumnProps) {
  const { buttons } = props;

  const [containerSize, setContainerSize] = useState(() => ({
    width: 0,
    height: 0,
  }));
  const [hasUpdatedSize, setHasUpdatedSize] = useState(false);

  useEffect(() => {
    setHasUpdatedSize(false);
  }, [buttons]);

  return (
    <div
      className={styles.container}
      style={{ width: containerSize.width, height: containerSize.height }}
    >
      <div
        ref={(node) => {
          if (node && !hasUpdatedSize) {
            setHasUpdatedSize(true);
            setContainerSize({
              width: node.clientWidth,
              height: node.clientHeight,
            });
          }
        }}
        className={styles.contentWrapper}
      >
        {buttons.map(({ text, active, action, Icon }) => (
          <TextButton
            className={styles.button}
            isActive={active}
            onClick={() => action()}
          >
            {Icon && <Icon className={styles.buttonIcon} />}
            <span>{text}</span>
          </TextButton>
        ))}
      </div>
    </div>
  );
}
