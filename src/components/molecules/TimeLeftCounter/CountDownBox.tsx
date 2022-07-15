import { Center, Text } from '@chakra-ui/layout';
import React from 'react';

export const CountDownBox: React.FC = (props) => {
  return (
    <Center w="22px" h="22px" borderRadius={2} bg="text.400">
      <Text textStyle="h5" color="white">
        {props.children}
      </Text>
    </Center>
  );
};
