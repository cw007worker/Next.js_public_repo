import { Box, BoxProps, Center, Flex, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { Coupon } from 'type/viewModel/common/coupon';
import Image from 'next/image';

type Props = {
  userCoupon: Coupon;
  handleClick: () => void;
  isSelectedCoupon: boolean;
} & BoxProps;

export const SelectableCouponCard: React.VFC<Props> = ({
  userCoupon,
  handleClick,
  isSelectedCoupon,
  ...rest
}) => {
  return (
    <Box onClick={handleClick} {...rest}>
      <Box h="1" bgColor="action.notification"></Box>
      <Box
        bgColor="#FFF5F7"
        border="1px solid #FFC1CC"
        borderTop="none"
        pt="2.5"
        pb="5"
      >
        <Box px="5">
          <Flex alignItems="center">
            <Text textStyle="h3" color="action.notification">
              {userCoupon.discountType === 'AMOUNT'
                ? `¥${userCoupon.discount.amountOff?.toLocaleString()}`
                : `${userCoupon.discount.percentOff?.toLocaleString()}%`}
              &nbsp;OFF
            </Text>
            <Spacer />
            {isSelectedCoupon ? (
              <Box w="18px" h="18px">
                <Image
                  src="/CouponSelected.svg"
                  alt="CouponSelected"
                  height={18}
                  width={18}
                />
              </Box>
            ) : (
              <Box
                w="18px"
                h="18px"
                borderRadius="full"
                bg="text.200"
                border="1px solid"
                borderColor="bg.200"
              ></Box>
            )}
          </Flex>
          <Text textStyle="h5" color="action.notification">
            {userCoupon.campaignName}クーポン
          </Text>
          {/**
           * NOTE: 本来は「¥6,000以上のご注文の場合」というのはvalidation ruleから取得するべき
           * % Discountの場合は、¥6,000以上のvalidationが入るので、工数削減のために一旦ベタ書き対応
           */}
          {userCoupon.discountType == 'PERCENT' && (
            <Text textStyle="h7" color="action.notification">
              ¥6,000以上のご注文の場合
            </Text>
          )}
          <Flex alignItems="center" justifyContent="space-between">
            <Text textStyle="h7" color="action.notification">
              コード：{userCoupon.code}
            </Text>
            {userCoupon.isAlmostExpired && (
              <Text textStyle="h8" fontWeight="bold" color="#BB0022">
                有効期限が迫っています
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
            border="1px solid #FFC1CC"
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
            border="1px solid #FFC1CC"
            borderRight="none"
            bgColor="#FAFAFA"
            h="18px"
            w="10px"
          ></Box>
        </Center>
        <Box px="5">
          <Text textStyle="h8">
            &middot;{userCoupon.startDate}&nbsp;~&nbsp;
            {userCoupon.expirationDate}
          </Text>
          <Text textStyle="h8">&middot;すべての商品にお使いいただけます。</Text>
        </Box>
      </Box>
    </Box>
  );
};
