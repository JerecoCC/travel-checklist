import React, { FC } from 'react';
import { FormControl, FormErrorMessage, FormHelperText } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { InputPassword } from './InputPassword';

interface FormInputProps {
  errorText?: string;
  hasError?: boolean;
  helperText?: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
  value?: any;
  [x: string | number | symbol]: unknown;
}

export const FormInput: FC<FormInputProps> = ({
  errorText,
  hasError,
  helperText,
  onChange,
  placeholder,
  type = "text",
  value,
  ...others
}) => {
  return (
    <FormControl isInvalid={hasError}>
      {type === "password" ? (
        <InputPassword onChange={onChange} placeholder={placeholder} {...others}/>
      ) : (
        <Input
          type={type}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          placeholder={placeholder}
          focusBorderColor="teal.400"
          width="full"
          {...others}
        />
      )}
      {!hasError ? (
        <FormHelperText>{helperText}</FormHelperText>
      ) : (
        <FormErrorMessage>{errorText}</FormErrorMessage>
      )}
    </FormControl>
  );
}
