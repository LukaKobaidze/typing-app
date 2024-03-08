import styles from './Input.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
    >;
    error?: boolean;
  classNameContainer?: string;
  wrapperChildren?: React.ReactNode;
}

export default function Input(props: Props) {
  const { Icon, error, className, classNameContainer, wrapperChildren, ...restProps } =
    props;

  return (
    <div className={`${styles.wrapper} ${classNameContainer}`}>
      <input className={`${styles.input} ${error ? styles.error : ''} ${className || ''}`} {...restProps} />
      <Icon className={styles.icon} />
      {wrapperChildren}
    </div>
  );
}
