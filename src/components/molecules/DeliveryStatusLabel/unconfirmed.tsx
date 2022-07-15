import { Box, Flex, FlexProps, Text } from '@chakra-ui/react';
import React from 'react';

export const UnconfirmedLabel: React.VFC<FlexProps> = ({ ...rest }) => {
  return (
    <Flex alignItems="center" {...rest}>
      <Box w="13px" h="13px" bg="text.300" borderRadius="full"></Box>
      <Text textStyle="h5" ml="5px">
        注文済み
      </Text>
    </Flex>
  );
};
