import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

export const RoundedBox: React.FC<BoxProps> = (props) => {
  return (
    <Box bg="white" borderRadius="full" {...props}>
      {props.children}
    </Box>
  );
};
