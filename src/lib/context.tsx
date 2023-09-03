import { createContext, useState } from 'react';
import { MODAL_TITLES, TODOS_COUNT_QUERY, TODOS_QUERY } from './constants';
import User from './types/User';
import { supabase } from './supabaseClient';
import Todo from './types/Todo';

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
  },
  todos: [] as Todo[],
  refreshList: (): void => {
    throw new Error('refreshList() not implemented');
  },
  completePercent: 0,
  parentId: "",
  setParentId: (id: string): void => {
    throw new Error('setParentId() not implemented');
  },
});

export function ChecklistContextProvider({ children }: any) {
  const [user, setUser] = useState<User>({} as User);
  const [itemId, setItemId] = useState<string>("");
  const [parentId, setParentId] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>(MODAL_TITLES.ADD);
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completePercent, setCompletePercent] = useState<number>(0);

  const refreshList = async () => {
    if (user.id) {
      try {
        let { data, error } = await supabase
          .from('todos')
          .select(TODOS_QUERY)
          .is('parent_id', null)
          .eq('user_id', user.id)
          .order('is_completed')
          .order('created_at');

        if (error) throw error;
        if (data) {
          setTodos(data);
          calculatePercent();
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  const calculatePercent = async () => {
    try {
      let { data, error } = await supabase
        .from('todos')
        .select(TODOS_COUNT_QUERY)
        .eq('user_id', user.id);

      if (error) throw error;
      if (data) {
        const completed = data.reduce((total, item) => total + (item.is_completed ? 1 : 0), 0);
        setCompletePercent(data.length > 0 ? Math.round((completed / data.length) * 100) : 0);
      }
    } catch (error) {
      console.error(error);
    }
  }

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
      setModalOpen,
      todos,
      refreshList,
      completePercent,
      parentId,
      setParentId
    }}>
      {children}
    </ChecklistContext.Provider>
  );
}
