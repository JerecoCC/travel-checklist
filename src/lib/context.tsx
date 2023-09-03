import { createContext, useState } from 'react';
import { MODAL_TITLES } from './constants';
import User from './types/User';

export const ChecklistContext = createContext({
  user: {
    id: "",
    email: "",
  } as User,
  setUser: (user: User): void => {
    throw new Error('setUser() not implemented');
  },
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
  const [user, setUser] = useState<User>({} as User);
  const [modalTitle, setModalTitle] = useState<string>(MODAL_TITLES.ADD);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <ChecklistContext.Provider value={{ user, setUser, modalTitle, setModalTitle, isModalOpen, setIsModalOpen }}>
      {children}
    </ChecklistContext.Provider>
  );
}
