import { Button, ButtonProps } from '@chakra-ui/react';
import React, { forwardRef } from 'react';

const NormalButton = forwardRef<any, ButtonProps>((props, ref) => {
  return (
    <Button
      color="white"
      bg="text.400"
      borderRadius="3"
      h="12"
      fontSize="sm"
      fontWeight="bold"
      _hover={{ opacity: 0.7 }}
      ref={ref}
      {...props}
    >
      {props.children}
    </Button>
  );
});

NormalButton.displayName = 'NormalButton';

export default NormalButton;
