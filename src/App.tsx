import { useState, useContext } from 'react';
import { GlobalContext } from 'context/global.context';
import { StatsContextProvider } from 'context/stats.context';
import { CustomizeContextProvider } from 'context/customize.context';
import { TypemodeContextProvider } from 'context/typemode.context';
import { IconRedirect, IconGithub } from 'assets/image';
import { useWindowDimensions } from 'hooks';
import { Logo, Tooltip } from 'components/UI';
import { TypingResult } from 'components/Typing/types';
import Result from 'components/Typing/Result';
import Customize from 'components/Customize';
import Stats from 'components/Stats';
import Typemode from 'components/Typemode';
import Typing from 'components/Typing';
import RecentResults from 'components/RecentResults';
import styles from 'styles/App.module.scss';

export default function App() {
  const { typingStarted } = useContext(GlobalContext);

  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [previewResult, setPreviewResult] = useState<TypingResult | null>(null);
  const [windowWidth] = useWindowDimensions();

  return (
    <>
      <StatsContextProvider>
        <TypemodeContextProvider>
          <CustomizeContextProvider>
            <header className={styles.header}>
              <div className={styles.headerLogoButtonsWrapper}>
                <div
                  onClick={() => {
                    setPreviewResult(null);
                  }}
                >
                  <Logo colored={!typingStarted} />
                </div>
                <div
                  className={`opacity-transition ${typingStarted ? 'hide' : ''} ${
                    styles.headerButtons
                  }`}
                >
                  <Customize
                    classNameButton={`${styles.headerBtn} ${styles.customize}`}
                    isCustomizing={isCustomizing}
                    onCustomizeOpen={() => setIsCustomizing(true)}
                    onCustomizeClose={() => setIsCustomizing(false)}
                    windowWidth={windowWidth}
                  />
                  <Stats
                    classNameButton={`${styles.headerBtn} ${styles.customize}`}
                    isOpen={isStatsOpen}
                    onStatsOpen={() => setIsStatsOpen(true)}
                    onStatsClose={() => setIsStatsOpen(false)}
                    windowWidth={windowWidth}
                  />
                </div>
              </div>
              <Typemode
                className={`opacity-transition ${typingStarted ? 'hide' : ''}`}
                hidden={typingStarted}
              />
            </header>

            <main>
              {previewResult ? (
                <Result
                  result={previewResult}
                  onGoBack={() => setPreviewResult(null)}
                  includeDate
                />
              ) : (
                <Typing disabled={isCustomizing || isStatsOpen} />
              )}
            </main>
          </CustomizeContextProvider>
        </TypemodeContextProvider>

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

          <RecentResults
            className={`opacity-transition ${typingStarted ? 'hide' : ''}`}
            onPreviewResult={(result) => setPreviewResult(result)}
          />
        </footer>
      </StatsContextProvider>
    </>
  );
}
