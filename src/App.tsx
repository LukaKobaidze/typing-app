import { TypingContextProvider } from 'context';
import { Header, Main, Footer } from 'layouts';

const App = () => (
  <TypingContextProvider>
    <Header />
    <Main />
    <Footer />
  </TypingContextProvider>
);

export default App;
