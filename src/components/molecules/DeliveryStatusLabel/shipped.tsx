import { Box, Flex, FlexProps, Text } from '@chakra-ui/react';
import React from 'react';

export const ShippedLabel: React.VFC<FlexProps> = ({ ...rest }) => {
  return (
    <Flex alignItems="center" {...rest}>
      <Box w="13px" h="13px" bg="action.assistant" borderRadius="full"></Box>
      <Text textStyle="h5" ml="5px">
        発送済み
      </Text>
    </Flex>
  );
};
