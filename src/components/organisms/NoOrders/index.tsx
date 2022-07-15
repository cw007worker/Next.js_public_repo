import { Box, Center, CenterProps, Text } from '@chakra-ui/layout';
import { NoItem } from 'components/atoms/NoItem';
import Image from 'next/image';
import React from 'react';

export const NoOrders: React.VFC<CenterProps> = ({ ...rest }) => {
  return (
    <Center {...rest}>
      <Box>
        <Center mb="8">
          <NoItem w="91px" h="91px" />
        </Center>
        <Text textStyle="h6" color="text.300">
          注文した商品はまだありません。
        </Text>
      </Box>
    </Center>
  );
};
