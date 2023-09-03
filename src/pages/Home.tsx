import { Button } from '@chakra-ui/button';
import React, { FC, useEffect, useState } from 'react';
import { ROUTES } from '../lib/constants';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from "react-router-dom";
import { Text } from '@chakra-ui/layout';
import { Progress } from '@chakra-ui/progress';
import { Checklist } from '../components';
import {  ChecklistContextProvider } from '../lib/context';

export const Home: FC = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.access_token) {
        navigate(ROUTES.CHECKLIST);
        if (data.session.user.email) {
          setUserEmail(data.session.user.email);
        }
      } else {
        navigate(ROUTES.LOGIN);
      }
    }

    checkSession();
    // eslint-disable-next-line
  }, []);

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
    <ChecklistContextProvider>
      <div className="w-full h-full bg-slate-200">
        <nav className='flex justify-between bg-teal-500 py-4 px-8'>
          <Text fontSize="2xl" fontWeight="bold" color="white">Travel Checklist</Text>
          <div className="flex gap-4 items-center">
            {userEmail}
            <Button onClick={signOut} colorScheme="blackAlpha">Sign Out</Button>
          </div>
        </nav>
        <div className="py-16 flex items-center flex-col gap-12">
          <section className="w-2/4 px-16 py-8 bg-white rounded-xl">
            <Text fontSize="3xl" fontWeight="medium" className="mb-4">My Travel Checklist</Text>
            <Text fontSize="xl" fontWeight="medium">30%</Text>
            <Progress value={30} />
          </section>
          <Checklist />
        </div>
      </div>
    </ChecklistContextProvider>
  )
}