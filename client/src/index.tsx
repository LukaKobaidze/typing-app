import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TypingContextProvider } from '@/context/typing.context';
import { StatsContextProvider } from './context/stats.context';
import { TypemodeContextProvider } from './context/typemode.context';
import { CustomizeContextProvider } from './context/customize.context';
import App from '@/App';
import '@/styles/styles.scss';

ReactDOM.render(
  <React.StrictMode>
    <TypingContextProvider>
      <StatsContextProvider>
        <TypemodeContextProvider>
          <CustomizeContextProvider>
            <App />
          </CustomizeContextProvider>
        </TypemodeContextProvider>
      </StatsContextProvider>
    </TypingContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
