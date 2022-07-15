import { Box, ButtonProps } from '@chakra-ui/react';
import NormalButton from 'components/atoms/NormalButton';
import React from 'react';

const FixedBottomButton: React.FC<ButtonProps> = (props) => {
  return (
    <Box position="fixed" bottom="0" w="full" px="6" py="3" bg="white">
      <Box textAlign="center">
        <NormalButton w="full" maxWidth="xl" {...props}>
          {props.children}
        </NormalButton>
      </Box>
    </Box>
  );
};

export default FixedBottomButton;
