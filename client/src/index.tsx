import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ProfileContextProvider } from './context/profile.context';
import { TypingContextProvider } from '@/context/typing.context';
import { TypemodeContextProvider } from './context/typemode.context';
import { ModalContextProvider } from './context/modal.context';
import App from '@/App';
import './global.scss';

ReactDOM.render(
  <React.StrictMode>
    <ProfileContextProvider>
      <TypingContextProvider>
        <TypemodeContextProvider>
          <ModalContextProvider>
            <App />
          </ModalContextProvider>
        </TypemodeContextProvider>
      </TypingContextProvider>
    </ProfileContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
