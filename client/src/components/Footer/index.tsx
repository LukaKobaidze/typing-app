import { useContext } from 'react';
import { TypingContext } from '@/context/typing.context';
import { TypingResult } from '@/types';
import { IconGithub, IconRedirect } from '@/assets/image';
import { Tooltip } from '../UI';
import RecentResults from '../RecentResults';
import styles from '@/styles/Footer/Footer.module.scss';

interface Props {
  roomCode: string | null;
  onPreviewResult: (result: TypingResult) => void;
}

export default function Footer(props: Props) {
  const { roomCode, onPreviewResult } = props;

  const { typingStarted } = useContext(TypingContext);

  return (
    <footer
      className={`${styles.footer} opacity-transition ${
        typingStarted ? 'hide' : ''
      }`}
    >
      <div className={styles.links}>
        <Tooltip
          text={
            <div className={styles['github-hover-wrapper']}>
              <p>repository</p>
              <IconRedirect className={styles['github-hover-wrapper__icon']} />
            </div>
          }
          position="right"
          showOnHover
        >
          <a
            href="https://github.com/LukaKobaidze/typing-app"
            rel="noreferrer"
            target="_blank"
            className={styles.linksItemAnchor}
            tabIndex={typingStarted ? -1 : undefined}
          >
            <IconGithub />
          </a>
        </Tooltip>
      </div>

      {!roomCode && (
        <RecentResults
          className={`opacity-transition ${typingStarted ? 'hide' : ''}`}
          onPreviewResult={onPreviewResult}
        />
      )}
    </footer>
  );
}
