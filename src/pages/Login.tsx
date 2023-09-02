import React, { FC, useState } from "react";
import { Button, Divider, Input, Text } from "@chakra-ui/react"
import { supabase } from "../lib/helper/supabaseClient";
import { useNavigate } from "react-router-dom";
import { InputPassword, SocialMediaLogin } from "../components";
import { ROUTES } from "../constants";

export const Login: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex h-full">
      <section className="w-2/3 flex flex-col justify-center items-center gap-4 px-20 text-center">
        <Text fontSize="5xl" as="b" color="teal.400">Login To Travel Checklist</Text>
        <form className="flex flex-col gap-4 items-center w-4/6 max-w-md" onSubmit={login}>
          <Input
            focusBorderColor="teal.400"
            placeholder="Email"
            width="full"
            autoComplete="email"
            type="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <InputPassword onChange={(value: string) => setPassword(value)} placeholder="Password"/>
          <Button
            colorScheme="teal"
            className="w-3/6 max-w-sm"
            onClick={login}
          >
            Sign In
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
      <section className="w-1/3 flex flex-col justify-center items-center gap-4 bg-teal-500 text-white text-center px-16">
        <Text fontSize="5xl" as="b">New Here?</Text>
        <Text fontSize="lg">Sign up now to start creating checklists</Text>
        <Button
          colorScheme="whiteAlpha"
          color="ButtonText"
          width="60"
          onClick={() => {
            navigate(ROUTES.SIGNUP)
          }}
        >
          Sign Up
        </Button>
      </section>
    </div>
  )
}