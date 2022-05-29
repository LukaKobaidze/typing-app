import { ReactComponent as IconGithub } from 'assets/images/github.svg';
import LinksItem from './LinksItem';
import styles from 'styles/Links/Links.module.scss';

const Links = () => {
  return (
    <div className={styles.links}>
      <LinksItem
        name="repository"
        href="https://github.com/LukaKobaidze/typing-app"
        icon={<IconGithub />}
      />
    </div>
  );
};

export default Links;
