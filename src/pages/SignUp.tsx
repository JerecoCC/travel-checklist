import React, { FC, useEffect, useState } from 'react';
import { FormInput, SocialMediaLogin } from '../components';
import { Divider, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { useNavigate } from "react-router-dom";
import { ROUTES } from '../constants';
import { useDebounce } from '../hooks/useDebounce';
import { supabase } from '../lib/helper/supabaseClient';

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const SignUp: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.access_token) {
        navigate(ROUTES.CHECKLIST);
      } else {
        navigate(ROUTES.SIGNUP);
      }
    }

    checkSession();
    // eslint-disable-next-line
  }, []);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const debouncedPassword: string = useDebounce(confirmPassword, 300);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (debouncedPassword) {
      if (password !== debouncedPassword) {
        setFormErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords must match"
        }));
      } else {
        setFormErrors({});
      }
    }
  }, [debouncedPassword, password])

  const validate = (): boolean => {
    let isValid: boolean = true;
    let errors: FormErrors = {};

    if (email === "") {
      errors.email = "Required";
      isValid = false;
    } else if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      errors.email = "Email not valid";
      isValid = false;
    }

    if (password === "") {
      errors.password = "Required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be atleast 6 digits";
      isValid = false;
    }

    if (password !== debouncedPassword) {
      errors.confirmPassword = "Passwords must match";
      isValid = false;
    }

    setFormErrors(errors)

    return isValid;
  }

  const signup = async () => {
    if (validate()) {
      try {
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (error) {
          throw error;
        } else {
          navigate(ROUTES.CHECKLIST)
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="flex h-full">
      <section className="w-1/3 flex flex-col justify-center items-center gap-4 bg-teal-500 text-white text-center px-16">
        <Text fontSize="5xl" as="b">Welcome Back!</Text>
        <Text fontSize="lg">Login now to access all your checklists</Text>
        <Button
          colorScheme="whiteAlpha"
          color="ButtonText"
          width="60"
          onClick={() => {
            navigate(ROUTES.LOGIN)
          }}
        >
          Sign In
        </Button>
      </section>
      <section className="w-2/3 flex flex-col justify-center items-center gap-4 px-20 text-center">
        <Text fontSize="5xl" as="b" color="teal.400">Create Account</Text>
        <form className="flex flex-col gap-4 items-center w-4/6 max-w-md">
          <FormInput
            placeholder="Email"
            type="email"
            autoComplete="email"
            onChange={(value: string) => setEmail(value)}
            hasError={!!formErrors.email}
            errorText={formErrors.email}
          />
          <FormInput
            placeholder="Password"
            onChange={(value: string) => setPassword(value)}
            autoComplete="current-password"
            type="password"
            hasError={!!formErrors.password}
            errorText={formErrors.password}
          />
          <FormInput
            placeholder="Confirm Password"
            onChange={(value: string) => { setConfirmPassword(value) }}
            autoComplete="current-password"
            type="password"
            hasError={!!formErrors.confirmPassword}
            errorText={formErrors.confirmPassword}
          />
          <Button
            colorScheme="teal"
            className="w-3/6 max-w-sm"
            onClick={signup}
          >
            Sign Up
          </Button>
        </form>
        <div className="my-6 relative">
          <Divider width="xl" />
          <Text
            fontSize="sm"
            color="gray.400"
            className="w-fit bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4"
          >
            OR
          </Text>
        </div>
        <SocialMediaLogin />
      </section>
    </div>
  )
}
