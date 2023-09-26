import { forwardRef } from 'react';
import styles from 'styles/UI/ButtonRounded.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: '1' | '2';
}
type Ref = HTMLButtonElement;

export default forwardRef<Ref, Props>(function ButtonRounded(props, ref) {
  const { variant = '1', className, children, ...restProps } = props;

  return (
    <button className={`${styles.button} ${styles[`button--${variant}`]} ${className}`} {...restProps} ref={ref}>
      {children}
    </button>
  );
});
