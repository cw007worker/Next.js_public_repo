import React from 'react';
import { TextareaProps, Textarea as _Textarea } from '@chakra-ui/react';

export const Textarea: React.VFC<TextareaProps> = ({ ...props }) => (
  <_Textarea
    borderRadius="1"
    border="1px"
    borderColor="text.100"
    bg="white"
    h="14"
    fontSize="sm"
    {...props}
  />
);
