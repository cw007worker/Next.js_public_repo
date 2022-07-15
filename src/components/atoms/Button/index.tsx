import { Button as _Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <_Button
      color="white"
      bg="text.400"
      borderRadius="3"
      fontSize="sm"
      fontWeight="bold"
      _hover={{ opacity: 0.7 }}
      {...props}
    >
      {props.children}
    </_Button>
  );
};
