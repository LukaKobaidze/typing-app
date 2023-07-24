import { useState, useContext, useCallback } from 'react';
import { GlobalContext } from 'context/global.context';
import { TypemodeContextProvider } from 'context/typemode.context';
import { CustomizeContextProvider } from 'context/customize.context';
import { IconRedirect, IconGithub } from 'assets/image';
import { useLocalStorageState } from 'hooks';
import { Logo, Tooltip } from 'components/UI';
import { TypingResult } from 'components/Typing/types';
import Result from 'components/Typing/Result';
import Customize from 'components/Customize';
import Typemode from 'components/Typemode';
import Typing from 'components/Typing';
import RecentResults from 'components/RecentResults';
import styles from 'styles/App.module.scss';

export type RecentResultsData = {
  best: TypingResult;
  recent: TypingResult[];
};

export default function App() {
  const { typingStarted } = useContext(GlobalContext);

  const [isCustomizing, setIsCustomizing] = useState(false);
  const [results, setResults] = useLocalStorageState<RecentResultsData | null>(
    'results',
    null
  );
  const [previewResult, setPreviewResult] = useState<TypingResult | null>(null);

  const handleNewResult = useCallback(
    (newResult: TypingResult) => {
      setResults((state) => {
        if (!state) {
          return {
            best: newResult,
            recent: [newResult],
          };
        }

        let isNewBest = false;

        if (
          newResult.timeline[newResult.timeline.length - 1].wpm >
          state.best.timeline[state.best.timeline.length - 1].wpm
        ) {
          isNewBest = true;
        }

        return {
          best: isNewBest ? newResult : state.best,
          recent: [newResult, ...state.recent.slice(0, 4)],
        };
      });
    },
    [setResults]
  );

  return (
    <>
      <TypemodeContextProvider>
        <CustomizeContextProvider>
          <header className={styles.header}>
            <div className={styles.headerLogoActionsWrapper}>
              <Logo colored={!typingStarted} />
              <div
                className={`opacity-transition ${typingStarted ? 'hide' : ''} ${
                  styles.headerActions
                }`}
              >
                <Customize
                  className={styles.customize}
                  isCustomizing={isCustomizing}
                  onCustomizeOpen={() => setIsCustomizing(true)}
                  onCustomizeClose={() => setIsCustomizing(false)}
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
              <Typing disabled={isCustomizing} onNewResult={handleNewResult} />
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
            position="top"
            showOnHover
          >
            <a
              href="https://github.com/LukaKobaidze/typing-app"
              rel="noreferrer"
              target="_blank"
              className="links-item__link"
              tabIndex={typingStarted ? -1 : undefined}
            >
              <IconGithub />
            </a>
          </Tooltip>
        </div>

        {results && (
          <RecentResults
            className={`opacity-transition ${typingStarted ? 'hide' : ''}`}
            data={results}
            onPreviewResult={(result) => setPreviewResult(result)}
          />
        )}
      </footer>
    </>
  );
}
