import 'styles/UI/TextOnHover.scss';

interface Props {
  text: string;
  children: React.ReactNode;
  classNameWrapper?: string;
  className?: string;
}

const TextOnHover = (props: Props) => {
  const { text, children, classNameWrapper, className } = props;

  return (
    <div className={`text-on-hover ${classNameWrapper}`}>
      {children}
      <div className={`text-on-hover__text-div ${className}`}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default TextOnHover;
