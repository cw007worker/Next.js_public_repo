import React from 'react';
import { Box, BoxProps, Flex, Spacer, Text } from '@chakra-ui/layout';
import { DeliveryInfo } from 'type/viewModel/common/deliveryInfo';
import { deliveryDateFormat } from 'utils/dateFormat';

type Props = {
  deliveryInfo: DeliveryInfo;
} & BoxProps;
export const DeliveryInfoCard: React.VFC<Props> = ({
  deliveryInfo,
  ...rest
}) => {
  return (
    <Box bg="white" borderRadius="5" px="5" py="2" {...rest}>
      <Text>
        1週間~2週間以内でお届け({deliveryDateFormat(deliveryInfo.shortestDate)}~
        {deliveryDateFormat(deliveryInfo.lateDate)})
      </Text>
    </Box>
  );
};
