import { Box, BoxProps, Center, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Coupon } from 'type/viewModel/common/coupon';

type Props = {
  userCoupon: Coupon;
  isExpired?: boolean;
} & BoxProps;

export const InactiveCouponCard: React.VFC<Props> = ({
  userCoupon,
  isExpired = false,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <Box h="1" bgColor="text.200"></Box>
      <Box
        bgColor="#FAFAFA"
        border="1px solid"
        borderColor="text.100"
        borderTop="none"
        pt="2.5"
        pb="5"
      >
        <Box px="5">
          <Text textStyle="h3" color="text.200">
            {userCoupon.discountType === 'AMOUNT'
              ? `¥${userCoupon.discount.amountOff?.toLocaleString()}`
              : `${userCoupon.discount.percentOff?.toLocaleString()}%`}
            &nbsp;OFF
          </Text>
          <Text textStyle="h5" color="text.200">
            {userCoupon.campaignName}クーポン
          </Text>
          {/**
           * NOTE: 本来は「¥6,000以上のご注文の場合」というのはvalidation ruleから取得するべき
           * % Discountの場合は、¥6,000以上のvalidationが入るので、工数削減のために一旦ベタ書き対応
           */}
          {userCoupon.discountType == 'PERCENT' && (
            <Text textStyle="h7" color="text.200">
              ¥6,000以上のご注文の場合
            </Text>
          )}
          <Flex alignItems="center" justifyContent="space-between">
            <Text textStyle="h7" color="text.200">
              コード：{userCoupon.code}
            </Text>
            {isExpired && (
              <Text
                textStyle="h8"
                fontWeight="bold"
                color="text.300"
                bg="bg.200"
                px="1.5"
              >
                期限切れ
              </Text>
            )}
          </Flex>
        </Box>
        <Center h="18px" position="relative">
          <Box
            bgSize="12px 1px"
            bgGradient="linear(to-r, #FFFFFF, #FFFFFF 6px, transparent 6px, transparent 12px)"
            bgRepeat="repeat-x"
            h="1px"
            w="full"
          ></Box>
          <Box
            position="absolute"
            top="0"
            left="-1px"
            borderRadius="0 10px 10px 0"
            border="1px solid"
            borderColor="text.100"
            borderLeft="none"
            bgColor="#FAFAFA"
            h="18px"
            w="10px"
          ></Box>
          <Box
            position="absolute"
            top="0"
            right="-1px"
            borderRadius="10px 0 0 10px"
            border="1px solid"
            borderColor="text.100"
            borderRight="none"
            bgColor="#FAFAFA"
            h="18px"
            w="10px"
          ></Box>
        </Center>
        <Box px="5">
          <Text textStyle="h8" color="text.200">
            &middot;{userCoupon.startDate}&nbsp;~&nbsp;
            {userCoupon.expirationDate}
          </Text>
          <Text textStyle="h8" color="text.200">
            &middot;すべての商品にお使いいただけます。
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
