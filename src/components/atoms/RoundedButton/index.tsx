import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

const RoundedButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      color="white"
      bg="text.400"
      borderRadius="40"
      h="50px"
      fontSize="sm"
      fontWeight="bold"
      _hover={{ opacity: 0.7 }}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default RoundedButton;
