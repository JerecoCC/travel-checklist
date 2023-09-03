import React, { FC } from 'react';
import { IconButton } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { supabase } from '../lib/supabaseClient';
import { Provider } from '@supabase/gotrue-js';
import { ROUTES } from '../lib/constants';

export const SocialMediaLogin: FC = () => {
  const login = async (provider: Provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
          redirectTo: ROUTES.CHECKLIST
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <Text
        fontSize="lg"
        color="gray.400"
        className="mb-4"
      >
        Login using social networks:
      </Text>
      <div className="flex justify-center gap-4">
        <IconButton
          colorScheme="facebook"
          aria-label="Sign In Facebook"
          icon={<FontAwesomeIcon icon={faFacebook} />}
          onClick={() => login("facebook")}
        />
        <IconButton
          colorScheme="red"
          aria-label="Sign In Google"
          icon={<FontAwesomeIcon icon={faGoogle} />}
          onClick={() => login("google")}
        />
      </div>
    </div>
  );
}