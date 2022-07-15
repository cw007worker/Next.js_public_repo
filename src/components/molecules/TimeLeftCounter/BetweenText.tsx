import { Text } from '@chakra-ui/layout';
import React from 'react';

export const BetweenText: React.FC = (props) => {
  return (
    <Text textStyle="h5" fontSize={['12px', '14px']} px="0.5">
      {props.children}
    </Text>
  );
};
