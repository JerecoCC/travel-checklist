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
  itemId: "",
  setItemId: (id: string): void => {
    throw new Error('setItemId() not implemented');
  },
  isAlertOpen: false,
  setAlertOpen: (toggle: boolean): void => {
    throw new Error('setAlertOpen() not implemented');
  },
  isModalOpen: false,
  setModalOpen: (toggle: boolean): void => {
    throw new Error('setModalOpen() not implemented');
  },
  modalTitle: MODAL_TITLES.ADD,
  setModalTitle: (title: string): void => {
    throw new Error('setModalTitle() not implemented');
  }
});

export function ChecklistContextProvider({ children }: any) {
  const [user, setUser] = useState<User>({} as User);
  const [itemId, setItemId] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>(MODAL_TITLES.ADD);
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <ChecklistContext.Provider value={{
      user,
      setUser,
      itemId,
      setItemId,
      modalTitle,
      setModalTitle,
      isAlertOpen,
      setAlertOpen,
      isModalOpen,
      setModalOpen
    }}>
      {children}
    </ChecklistContext.Provider>
  );
}
