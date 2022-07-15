import { Button as _Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

export const ButtonWithBorder: React.FC<ButtonProps> = (props) => {
  return (
    <_Button
      color="text.400"
      bg="bg.100"
      borderRadius="3"
      border="1px solid"
      borderColor="text.400"
      fontSize="14px"
      fontWeight="bold"
      _hover={{ opacity: 0.7 }}
      {...props}
    >
      {props.children}
    </_Button>
  );
};
