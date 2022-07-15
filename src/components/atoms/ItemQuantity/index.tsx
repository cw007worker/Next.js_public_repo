import { Center, CenterProps, Text } from '@chakra-ui/layout';
import React from 'react';

type Props = {
  quantity: number;
} & CenterProps;
export const ItemQuantity: React.VFC<Props> = ({ quantity, ...rest }) => {
  return (
    <Center
      h="30px"
      w="30px"
      borderRadius="full"
      bg="white"
      opacity="0.8"
      {...rest}
    >
      <Text textStyle="h5">×{quantity}</Text>
    </Center>
  );
};
