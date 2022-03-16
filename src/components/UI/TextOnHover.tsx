import 'styles/UI/TextOnHover.scss';

interface Props {
  text: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactNode;
  classNameWrapper?: string;
  className?: string;
}

const TextOnHover = (props: Props) => {
  const {
    text,
    position = 'bottom',
    children,
    classNameWrapper,
    className,
  } = props;

  return (
    <div
      className={`text-on-hover text-on-hover--${position} ${classNameWrapper}`}
    >
      {children}
      <div className={`text-on-hover__text-div ${className}`}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default TextOnHover;
