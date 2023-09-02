import React, { FC } from "react";
import { Button, Divider, IconButton, Input, Text } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

export const Login: FC = () => {
  return (
    <div className="flex h-full">
      <section className="w-2/3 flex flex-col justify-center items-center gap-4 px-20 text-center">
        <Text fontSize="5xl" as="b">Login To Travel Checklist</Text>
        <form className="flex flex-col gap-4 items-center w-4/6 max-w-md">
          <Input
            focusBorderColor="teal.400"
            placeholder="Email"
            width="full"
          />
          <Input
            focusBorderColor="teal.400"
            placeholder="Password"
            type="password"
          />
          <Button
            colorScheme="teal"
            className="w-3/6 max-w-sm"
          >
            Sign In
          </Button>
        </form>
        <Divider className="my-6"/>
        <div>
          <Text fontSize="xl" color="gray.500" className="mb-4">Login using social networks</Text>
          <div className="flex justify-center gap-4">
            <IconButton
              colorScheme="facebook"
              aria-label="Sign In Facebook"
              icon={<FontAwesomeIcon icon={faFacebook} />}
            />
            <IconButton
              colorScheme="red"
              aria-label="Sign In Google"
              icon={<FontAwesomeIcon icon={faGoogle} />}
            />
            <IconButton
              colorScheme="twitter"
              aria-label="Sign In Twitter"
              icon={<FontAwesomeIcon icon={faTwitter} />}
            />
          </div>
        </div>
      </section>
      <section className="w-1/3 flex flex-col justify-center items-center gap-4 bg-teal-500 text-white text-center px-16">
        <Text fontSize="5xl" as="b">New Here?</Text>
        <Text fontSize="xl">Sign up now to start creating checklists</Text>
        <Button
          colorScheme="whiteAlpha"
          color="ButtonText"
          width="60"
        >
          Sign Up
        </Button>
      </section>
    </div>
  )
}