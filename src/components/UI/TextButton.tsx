import 'styles/UI/TextButton.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isActive: boolean;
}

const TextButton = ({ text, isActive, className, ...rest }: Props) => {
  return (
    <button
      className={`text-button ${isActive ? 'active' : ''} ${className}`}
      {...rest}
    >
      {text}
    </button>
  );
};

export default TextButton;
