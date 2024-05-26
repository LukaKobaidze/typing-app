import styles from './InputField.module.scss';
import { IconEyeOff, IconEyeOn } from '@/assets/image';
import { Tooltip } from '@/components/UI';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  error?: boolean;
  classNameContainer?: string;
  wrapperChildren?: React.ReactNode;
  showPassword?: { bool: boolean; onToggle: () => void };
}

export default function InputField(props: Props) {
  const {
    Icon,
    error,
    type,
    className,
    classNameContainer,
    wrapperChildren,
    showPassword,
    ...restProps
  } = props;

  return (
    <div className={`${styles.wrapper} ${classNameContainer}`}>
      <input
        className={`${styles.input} ${showPassword ? styles.inputPassword : ''} ${
          error ? styles.error : ''
        } ${className || ''}`}
        {...restProps}
        type={showPassword?.bool === true ? 'text' : type}
      />
      <Icon className={styles.icon} />
      {showPassword && (
        <Tooltip
          position="left"
          text={showPassword.bool === true ? 'hide password' : 'show password'}
          showOnHover
          className={styles.passwordVisibility}
        >
          <button type="button" onClick={() => showPassword.onToggle()}>
            {showPassword.bool === true ? (
              <IconEyeOn className={styles.passwordVisibilityIcon} />
            ) : (
              <IconEyeOff className={styles.passwordVisibilityIcon} />
            )}
          </button>
        </Tooltip>
      )}
      {wrapperChildren}
    </div>
  );
}
