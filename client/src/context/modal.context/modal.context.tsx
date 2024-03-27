import { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { TypingContext } from '../typing.context';
import OneVersusOneModal from './components/OneVersusOneModal';
import CustomizeModal from './components/CustomizeModal';
import AccountModal from './components/AccountModal';
import QuoteTagsModal from './components/QuoteTagsModal';
import UserModal from './components/UserModal';

type ModalType =
  | 'customize'
  | 'oneVersusOne'
  | 'account'
  | 'quoteTags'
  | 'user'
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

  const modals: Record<NonNullable<ModalType>, JSX.Element> = {
    oneVersusOne: <OneVersusOneModal onClose={() => onOpenModal(null)} />,
    customize: <CustomizeModal onClose={() => onOpenModal(null)} />,
    account: <AccountModal onClose={() => onOpenModal(null)} />,
    quoteTags: <QuoteTagsModal onClose={() => onOpenModal(null)} />,
    user: <UserModal onClose={() => onOpenModal(null)} />,
  };

  return (
    <ModalContext.Provider value={{ activeModal, onOpenModal }}>
      {children}
      {activeModal && createPortal(modals[activeModal], document.body)}
    </ModalContext.Provider>
  );
}
