import React from 'react';
import {
  FormErrorMessage,
  FormControl,
  InputProps,
  FormControlProps,
  BoxProps,
} from '@chakra-ui/react';
import { TextField } from 'components/atoms/TextField';
import { TextFieldWithBoarder } from 'components/atoms/TextField/withBorder';

type Props = {
  name: string;
  errorMessage?: string;
  FormControlProps?: FormControlProps;
  InputProps?: InputProps;
} & BoxProps;

export const TextFieldWithNoLabel: React.FC<Props> = ({
  name,
  errorMessage,
  FormControlProps,
  InputProps,
  ...rest
}) => {
  return (
    <FormControl id={name} {...FormControlProps} {...rest}>
      <TextFieldWithBoarder {...InputProps} />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
