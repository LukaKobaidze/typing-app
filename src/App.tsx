import TypingContextProvider from 'context/TypingContextProvider';
import Header from 'components/Header/Header';
import Typing from 'components/Typing/Typing';
import Footer from 'components/Footer/Footer';

const App = () => {
  return (
    <>
      <TypingContextProvider>
        <Header />
        <main>
          <Typing />
        </main>
      </TypingContextProvider>
      <Footer />
    </>
  );
};

export default App;
