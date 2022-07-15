import { Box, Text, BoxProps } from '@chakra-ui/react';
import React from 'react';

export const TagLabel: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box
      border="1px solid"
      borderColor="text.300"
      borderRadius="2px"
      px="5px"
      {...rest}
    >
      <Text
        fontSize="12px"
        lineHeight="16px"
        fontWeight="bold"
        color="text.300"
        textAlign="center"
      >
        {children}
      </Text>
    </Box>
  );
};
