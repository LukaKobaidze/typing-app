import { useContext } from 'react';
import TypingContext from 'context/typing-context';
import { Logo } from 'components/UI';
import Settings from 'components/Settings/Settings';
import Typing from 'components/Typing/Typing';
import Links from 'components/Links/Links';
import Results from 'components/Results/Results';
import 'styles/App.scss';

const App = () => {
  const {
    state: { typingStarted },
  } = useContext(TypingContext);

  const typingStartedClass = typingStarted ? 'hide' : '';
  return (
    <>
      <header>
        <Logo colored={!typingStarted} />
        <Settings className={typingStartedClass} />
      </header>
      <main>
        <Typing />
      </main>
      <footer className={typingStartedClass}>
        <Links />
        <Results />
      </footer>
    </>
  );
};

export default App;
