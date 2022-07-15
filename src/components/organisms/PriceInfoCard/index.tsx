import React from 'react';
import { Box, BoxProps, Flex, Spacer, Text } from '@chakra-ui/layout';

type Props = {
  subtotalPrice: number;
  totalPrice: number;
  deliveryFee: number;
  usagePoints: number;
} & BoxProps;
export const PriceInfoCard: React.VFC<Props> = ({
  subtotalPrice,
  totalPrice,
  deliveryFee,
  usagePoints,
  ...rest
}) => {
  return (
    <Box bg="white" borderRadius="5" p="5" {...rest}>
      <Flex mb="2">
        <Text textStyle="h7">商品の小計</Text>
        <Spacer />
        <Text textStyle="h7">{`¥${subtotalPrice.toLocaleString()}`}</Text>
      </Flex>
      <Flex mb="5">
        <Text textStyle="h7">送料</Text>
        <Spacer />
        <Text textStyle="h7">{`¥${deliveryFee.toLocaleString()}`}</Text>
      </Flex>
      <Flex mb="5">
        <Text textStyle="h7" color="action.notification">
          pantrii会員限定価格ポイント
        </Text>
        <Spacer />
        <Text
          textStyle="h7"
          color="action.notification"
        >{`-¥${usagePoints.toLocaleString()}`}</Text>
      </Flex>
      <Flex alignItems="center">
        <Text textStyle="h6">合計（税込）</Text>
        <Spacer />
        <Text textStyle="h3">{`¥${totalPrice.toLocaleString()}`}</Text>
      </Flex>
    </Box>
  );
};
