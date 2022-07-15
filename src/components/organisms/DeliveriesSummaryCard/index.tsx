import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, BoxProps, Center, Flex, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { DeliveriesSummary } from 'type/viewModel/common/deliverriesSummary';

type Props = {
  deliveriesSummary: DeliveriesSummary;
} & BoxProps;
export const DeliveriesSummaryCard: React.VFC<Props> = ({
  deliveriesSummary,
  ...rest
}) => {
  return (
    <Box py="2" bg="bg.100" {...rest}>
      <Flex alignItems="flex-end" justifyContent="center" pt="2.5">
        <Box>
          <Text
            textStyle="h2"
            textAlign="center"
            color={
              deliveriesSummary.unconfirmedDeliveriesCount > 0
                ? 'text.400'
                : 'text.200'
            }
          >
            {deliveriesSummary.unconfirmedDeliveriesCount}
          </Text>
          <Text
            textStyle="h8"
            textAlign="center"
            color={
              deliveriesSummary.unconfirmedDeliveriesCount > 0
                ? 'text.400'
                : 'text.200'
            }
          >
            注文済み
          </Text>
        </Box>
        <Center w="18px" h="18px" mx="2">
          <ChevronRightIcon color="text.200" w="14px" h="14px" />
        </Center>
        <Box>
          <Text
            textStyle="h2"
            textAlign="center"
            color={
              deliveriesSummary.unshippedDeliveriesCount > 0
                ? 'text.400'
                : 'text.200'
            }
          >
            {deliveriesSummary.unshippedDeliveriesCount}
          </Text>
          <Text
            textStyle="h8"
            textAlign="center"
            color={
              deliveriesSummary.unshippedDeliveriesCount > 0
                ? 'text.400'
                : 'text.200'
            }
          >
            発送準備中
          </Text>
        </Box>
        <Center w="18px" h="18px" mx="2">
          <ChevronRightIcon color="text.200" w="14px" h="14px" />
        </Center>
        <Box>
          <Text
            textStyle="h2"
            textAlign="center"
            color={
              deliveriesSummary.shippedDeliveriesCount > 0
                ? 'text.400'
                : 'text.200'
            }
          >
            {deliveriesSummary.shippedDeliveriesCount}
          </Text>
          <Text
            textStyle="h8"
            textAlign="center"
            color={
              deliveriesSummary.shippedDeliveriesCount > 0
                ? 'text.400'
                : 'text.200'
            }
          >
            発送済み
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
