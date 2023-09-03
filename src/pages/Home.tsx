import { Button } from '@chakra-ui/button';
import React, { FC, useContext, useEffect, useState } from 'react';
import { ROUTES, TODOS_QUERY } from '../lib/constants';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from "react-router-dom";
import { Text } from '@chakra-ui/layout';
import { Progress } from '@chakra-ui/progress';
import { Checklist } from '../components';
import { ChecklistContext } from '../lib/context';
import Todo from '../lib/types/Todo';

export const Home: FC = () => {
  const navigate = useNavigate();
  const context = useContext(ChecklistContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completePercent, setCompletePercent] = useState<number>(0);

  supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'todos'
      },
      () => getItems()
    )
    .subscribe();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.access_token) {
        if (data.session.user) {
          context.setUser({
            id: data.session.user.id,
            email: data.session.user.email || ""
          });
        }
        navigate(ROUTES.CHECKLIST);
      } else {
        context.setUser({ id: "", email: "" });
        navigate(ROUTES.LOGIN);
      }
    }

    checkSession();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, [context.user]);

  const getItems = async () => {
    if (context.user.id) {
      try {
        let { data, error } = await supabase
          .from('todos')
          .select(TODOS_QUERY)
          .is('parent_id', null)
          .eq('user_id', context.user.id);
        if (error) throw error;
        if (data) {
          setTodos(data);
          calculateCompleted(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  const calculateCompleted = async (data: Todo[]) => {
    const completed = data.reduce((total, item) => total + (item.isComplete ? 1 : 0), 0);
    setCompletePercent(Math.round((completed / data.length) * 100));
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      } else {
        navigate(ROUTES.LOGIN);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full h-full bg-slate-200">
      <nav className='flex justify-between bg-teal-500 py-4 px-8'>
        <Text fontSize="2xl" fontWeight="bold" color="white">Travel Checklist</Text>
        <div className="flex gap-4 items-center">
          {context.user.email}
          <Button onClick={signOut} colorScheme="blackAlpha">Sign Out</Button>
        </div>
      </nav>
      <div className="py-16 flex items-center flex-col gap-12">
        <section className="w-2/4 px-16 py-8 bg-white rounded-xl">
          <Text fontSize="3xl" fontWeight="medium" className="mb-4">My Travel Checklist</Text>
          <Text fontSize="xl" fontWeight="medium">{completePercent}%</Text>
          <Progress value={completePercent} />
        </section>
        <Checklist data={todos} />
      </div>
    </div>
  )
}