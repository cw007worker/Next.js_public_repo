import React from 'react';
import { Box, BoxProps, Divider, Text } from '@chakra-ui/react';
import { Button } from 'components/atoms/Button';
import { CreditCardInfo } from 'components/molecules/CreditCardInfo';
import Link from 'next/link';
import { PaymentWay } from 'type/viewModel/common/paymentWay';
import { MembershipInfo } from 'type/viewModel/membershipInfo';

type Props = {
  membership: MembershipInfo;
} & BoxProps;
const MembershipPaymentSettingCard: React.FC<Props> = ({
  membership,
  ...rest
}) => {
  const subscriptionPaymentWay =
    membership.paymentWays.find((p) => p.isDefaultPaymentWayForSubscription) ||
    membership.paymentWays.find((p) => p.isDefaultPaymentWay) ||
    membership.paymentWays[0];
  return (
    <>
      <Box>
        <Text textStyle="h8" py="2" mt="5" mx="20px" color="text.400">
          メンバーシップお支払い設定
        </Text>
      </Box>
      <Box px="6" py="5" maxW="container.sm" mx="auto" bg="white">
        <Box py="1">
          <CreditCardInfo
            brand={subscriptionPaymentWay.brand}
            last4={subscriptionPaymentWay.last4}
            justifyContent="start"
          />
        </Box>
        <Box>
          {membership.stripeSubscription.willCancelAtPeriodEnd ? (
            <Text textStyle="h8" color="text.300" fontWeight="bold">
              次回のお支払い：無し
            </Text>
          ) : (
            <Text textStyle="h8" color="text.300" fontWeight="bold">
              次回のお支払い：
              {membership.stripeSubscription.currentPeriodEndDate}
            </Text>
          )}
        </Box>
        <Box pt="30px" pb="5px">
          <Link href={'/user/membership/payment'} passHref>
            <Button
              bg="white"
              color="action.assistant"
              border="1px"
              borderColor="action.assistant"
              width="100%"
              minHeight="48px"
            >
              クレジットカードを変更
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default MembershipPaymentSettingCard;
