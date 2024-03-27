import { ButtonRounded } from '@/components/UI';
import styles from './FormWrapper.module.scss';

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  errorMessage?: string;
  submitLoading?: boolean;
}

export default function FormWrapper(props: Props) {
  const { errorMessage, submitLoading, className, children, ...restProps } = props;

  return (
    <form className={`${styles.form} ${className || ''}`} {...restProps}>
      {children}

      <p className={styles.error}>{errorMessage || ''}</p>
      <ButtonRounded
        variant="2"
        type="submit"
        className={styles.btnSubmit}
        loading={submitLoading}
      >
        Confirm
      </ButtonRounded>
    </form>
  );
}
