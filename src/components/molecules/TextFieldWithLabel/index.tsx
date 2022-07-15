import React from 'react';
import {
  Box,
  Text,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  InputProps,
  FormControlProps,
  FormLabelProps,
  BoxProps,
} from '@chakra-ui/react';
import { TextField } from 'components/atoms/TextField';

type Props = {
  name: string;
  label: string;
  isRequired?: boolean;
  errorMessage?: string;
  FormControlProps?: FormControlProps;
  FormLabelProps?: FormLabelProps;
  InputProps?: InputProps;
} & BoxProps;
export const TextFieldWithLabel: React.FC<Props> = ({
  name,
  label,
  isRequired,
  errorMessage,
  FormControlProps,
  FormLabelProps,
  InputProps,
  ...rest
}) => {
  return (
    <FormControl id={name} {...FormControlProps} {...rest}>
      <FormLabel htmlFor={name} {...FormLabelProps}>
        <Box as="span" textStyle="h8">
          {label}
        </Box>
        {isRequired && (
          <Box
            as="span"
            fontSize="xl"
            lineHeight="18px"
            color="action.notification"
          >
            *
          </Box>
        )}
      </FormLabel>
      <TextField {...InputProps} />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
