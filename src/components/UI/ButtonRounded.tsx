import { forwardRef } from 'react';
import styles from 'styles/UI/ButtonRounded.module.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;
type Ref = HTMLButtonElement;

export default forwardRef<Ref, Props>(function ButtonRounded(props, ref) {
  const { className, children, ...restProps } = props;

  return (
    <button className={`${styles.button} ${className}`} {...restProps} ref={ref}>
      {children}
    </button>
  );
});
