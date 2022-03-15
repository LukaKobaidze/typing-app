import { ReactComponent as IconGithub } from 'assets/images/github.svg';
import LinksItem from './LinksItem';
import 'styles/Links/Links.scss';

const Links = () => {
  return (
    <div className="links">
      <LinksItem
        name="GitHub"
        href="https://github.com/LukaKobaidze/typing-app"
        icon={<IconGithub />}
      />
    </div>
  );
};

export default Links;
