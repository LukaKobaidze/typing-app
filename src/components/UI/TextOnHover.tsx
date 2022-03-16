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
    <div className={`text-on-hover ${classNameWrapper}`}>
      {children}
      <div
        className={`text-on-hover__text-div text-on-hover__text-div--${position} ${className}`}
      >
        <p>{text}</p>
      </div>
    </div>
  );
};

export default TextOnHover;
