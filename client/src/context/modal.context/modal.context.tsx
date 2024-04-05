import { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { TypingContext } from '../typing.context';
import OneVersusOneModal from './components/OneVersusOneModal';
import CustomizeModal from './components/CustomizeModal';
import AccountModal from './components/AccountModal';
import QuoteTagsModal from './components/QuoteTagsModal';
import UserModal from './components/UserModal';
import OauthUsernameModal, {
  OauthFinalStepsModalOptions,
} from './components/OauthFinalStepsModal';
import { ProfileContext } from '../profile.context';

export type ModalType =
  | { modal: 'customize' }
  | { modal: 'oneVersusOne' }
  | { modal: 'account' }
  | { modal: 'quoteTags' }
  | { modal: 'user' }
  | { modal: 'oauthFinalSteps'; options: OauthFinalStepsModalOptions }
  | null;

interface Context {
  activeModal: ModalType;
  onOpenModal: (modal: ModalType) => void;
}

const initial: Context = {
  activeModal: null,
  onOpenModal: () => {},
};

export const ModalContext = createContext(initial);

export function ModalContextProvider({ children }: { children: React.ReactNode }) {
  const { onTypingAllow, onTypingDisable } = useContext(TypingContext);
  const { oauthFinalSteps } = useContext(ProfileContext);
  const [activeModal, setActiveModal] = useState(initial.activeModal);

  /** Passing `null` to the function closes the modal */
  const onOpenModal: Context['onOpenModal'] = (modal) => {
    setActiveModal(modal);
  };

  useEffect(() => {
    if (activeModal) {
      onTypingDisable();
    } else {
      onTypingAllow();
    }
  }, [activeModal]);

  useEffect(() => {
    if (oauthFinalSteps) {
      setActiveModal({
        modal: 'oauthFinalSteps',
        options: { platform: oauthFinalSteps },
      });
    } else {
      setActiveModal(null);
    }
  }, [oauthFinalSteps]);

  return (
    <ModalContext.Provider value={{ activeModal, onOpenModal }}>
      {children}
      {activeModal &&
        createPortal(
          activeModal.modal === 'oneVersusOne' ? (
            <OneVersusOneModal onClose={() => onOpenModal(null)} />
          ) : activeModal.modal === 'customize' ? (
            <CustomizeModal onClose={() => onOpenModal(null)} />
          ) : activeModal.modal === 'account' ? (
            <AccountModal onClose={() => onOpenModal(null)} />
          ) : activeModal.modal === 'quoteTags' ? (
            <QuoteTagsModal onClose={() => onOpenModal(null)} />
          ) : activeModal.modal === 'user' ? (
            <UserModal onClose={() => onOpenModal(null)} />
          ) : activeModal.modal === 'oauthFinalSteps' ? (
            <OauthUsernameModal
              options={activeModal.options}
              onClose={() => onOpenModal(null)}
            />
          ) : null,
          document.body
        )}
    </ModalContext.Provider>
  );
}
