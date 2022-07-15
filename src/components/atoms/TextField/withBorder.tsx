import React from 'react';
import { forwardRef, Input, InputProps } from '@chakra-ui/react';

export const TextFieldWithBoarder = forwardRef<InputProps, 'input'>(
  (props, ref) => (
    <Input
      borderRadius="1"
      border="1px"
      borderColor="text.100"
      bg="white"
      h="14"
      fontSize="sm"
      ref={ref}
      {...props}
    />
  )
);
