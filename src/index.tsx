import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import 'styles/styles.scss';
import { TypingContextProvider } from 'context';

ReactDOM.render(
  <React.StrictMode>
    <TypingContextProvider>
      <App />
    </TypingContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
