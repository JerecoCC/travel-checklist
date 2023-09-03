import React, { FC, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { supabase } from '../lib/supabaseClient';
import { ROUTES } from '../lib/constants';

export const Default: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.access_token) {
        navigate(ROUTES.CHECKLIST)
      } else {
        navigate(ROUTES.LOGIN);
      }
    }

    checkSession();
    // eslint-disable-next-line
  }, []);

  return (
    <div>Redirecting...</div>
  )
}
