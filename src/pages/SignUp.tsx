import React, { FC, useState } from 'react';
import { InputPassword, SocialMediaLogin } from '../components';
import { Divider, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { useNavigate } from "react-router-dom";
import { Input, InputGroup } from '@chakra-ui/input';
import { ROUTES } from '../constants';

export const SignUp: FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  return (
    <div className="flex h-full">
      <section className="w-1/3 flex flex-col justify-center items-center gap-4 bg-teal-500 text-white text-center px-16">
        <Text fontSize="5xl" as="b">Welcome Back!</Text>
        <Text fontSize="lg">Log in now to access all your checklists</Text>
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
          <Input
            focusBorderColor="teal.400"
            placeholder="Name"
            width="full"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
          <Input
            focusBorderColor="teal.400"
            placeholder="Email"
            width="full"
            type="email"
            autoComplete="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <InputPassword onChange={(value: string) => setPassword(value)} placeholder="Password" />
          <InputPassword onChange={(value: string) => setConfirmPassword(value)} placeholder="Confirm Password" />
          <Button
            colorScheme="teal"
            className="w-3/6 max-w-sm"
            onClick={() => console.log("Sign Up")}
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