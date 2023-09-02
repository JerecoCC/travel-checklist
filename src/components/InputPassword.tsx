import { Button } from '@chakra-ui/button';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import React, { FC, useState } from 'react';

interface InputPasswordProps {
  onChange: (value: string) => void;
  placeholder: string;
  [x: string | number | symbol]: unknown;
}

export const InputPassword: FC<InputPasswordProps> = ({ onChange, placeholder, ...others }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <InputGroup size='md'>
      <Input
        focusBorderColor="teal.400"
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        {...others}
      />
      <InputRightElement width='4.5rem'>
        <Button
          h='1.75rem'
          size='sm'
          onClick={() => setShowPassword((prev) => !prev)}
          variant="ghost"
        >
          {showPassword ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
