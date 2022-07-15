import { Text, BoxProps } from '@chakra-ui/react';
import { RoundedBox } from 'components/atoms/RoundedBox';
import React from 'react';

export const RoundedTextBox: React.FC<BoxProps> = (props) => {
  return (
    <RoundedBox pl="5" pr="10" py="2.5" {...props}>
      <Text textStyle="h7" noOfLines={1}>
        {props.children}
      </Text>
    </RoundedBox>
  );
};
