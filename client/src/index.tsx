import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TypingContextProvider } from '@/context/typing.context';
import { StatsContextProvider } from './context/stats.context';
import { TypemodeContextProvider } from './context/typemode.context';
import App from '@/App';
import '@/styles/styles.scss';
import { ModalContextProvider } from './context/modal.context';
import { ProfileContextProvider } from './context/profile.context';

ReactDOM.render(
  <React.StrictMode>
    <ProfileContextProvider>
      <TypingContextProvider>
        <StatsContextProvider>
          <TypemodeContextProvider>
            <ModalContextProvider>
              <App />
            </ModalContextProvider>
          </TypemodeContextProvider>
        </StatsContextProvider>
      </TypingContextProvider>
    </ProfileContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
