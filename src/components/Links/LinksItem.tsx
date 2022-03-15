import { TextOnHover } from 'components/UI';

interface Props {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const LinksItem = ({ name, href, icon }: Props) => {
  return (
    <TextOnHover text={name}>
      <a
        href={href}
        rel="noreferrer"
        target="_blank"
        className="links-item__link"
      >
        {icon}
      </a>
    </TextOnHover>
  );
};

export default LinksItem;
