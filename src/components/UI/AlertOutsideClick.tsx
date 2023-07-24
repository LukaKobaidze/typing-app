import { useEffect, useRef } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  event: 'click' | 'mousedown';
  onOutsideClick: () => void;
  handleWhen?: boolean;
  ignore?: React.RefObject<Element>[];
}

export default function AlertOutsideClick(props: Props) {
  const {
    event,
    ignore,
    handleWhen = true,
    onOutsideClick,
    children,
    ...restProps
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEvent = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;

      if (
        !ref.current?.contains(target) &&
        (!ignore || ignore.every((ref) => !ref.current?.contains(target)))
      ) {
        onOutsideClick();
      }
    };

    if (handleWhen) {
      document.addEventListener(event, handleEvent);
    } else {
      document.removeEventListener(event, handleEvent);
    }

    return () => document.removeEventListener(event, handleEvent);
  }, [handleWhen, onOutsideClick, ignore, event]);

  return (
    <div ref={ref} {...restProps}>
      {children}
    </div>
  );
}
