import { createContext, useState } from 'react';
import { MODAL_TITLES } from './constants';

export const ChecklistContext = createContext({
  isModalOpen: false,
  setIsModalOpen: (toggle: boolean): void => {
    throw new Error('setIsModalOpen() not implemented');
  },
  modalTitle: MODAL_TITLES.ADD,
  setModalTitle: (title: string): void => {
    throw new Error('setModalTitle() not implemented');
  }
});

export function ChecklistContextProvider({ children }: any) {
  const [modalTitle, setModalTitle] = useState<string>(MODAL_TITLES.ADD);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <ChecklistContext.Provider value={{ modalTitle, setModalTitle, isModalOpen, setIsModalOpen }}>
      {children}
    </ChecklistContext.Provider>
  );
}
