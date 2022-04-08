import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TypingContextProvider } from 'context';
import App from 'App';
import 'styles/styles.scss';

ReactDOM.render(
  <React.StrictMode>
    <TypingContextProvider>
      <App />
    </TypingContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
