import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { GlobalContextProvider } from 'context/global.context';
import App from 'App';
import 'styles/styles.scss';

ReactDOM.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
