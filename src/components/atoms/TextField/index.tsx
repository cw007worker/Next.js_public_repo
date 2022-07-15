import React from 'react';
import { forwardRef, Input, InputProps } from '@chakra-ui/react';

export const TextField = forwardRef<InputProps, 'input'>((props, ref) => (
  <Input
    borderRadius="1"
    border="none"
    bg="white"
    h="14"
    ref={ref}
    {...props}
  />
));
