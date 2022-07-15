import React from 'react';
import { Box, BoxProps, Divider, Text } from '@chakra-ui/react';
import { Button } from 'components/atoms/Button';
import { MembershipInfo } from 'type/viewModel/membershipInfo';
import Link from 'next/link';

type Props = {
  membership: MembershipInfo;
} & BoxProps;
const MembershipPaymentStatusCard: React.FC<Props> = ({
  membership,
  ...rest
}) => {
  const isInvalidPaymentStatus = (membership: MembershipInfo) => {
    // FYI: https://stripe.com/docs/billing/subscriptions/overview
    let status = membership.stripeSubscription.status;
    return status === ('incomplete' || 'incomplete_expired' || 'past_due');
  };

  return (
    <>
      {isInvalidPaymentStatus(membership) && (
        <>
          <Box>
            <Text textStyle="h8" py="2" mt="5" mx="20px" color="text.400">
              メンバーシップ請求情報
            </Text>
          </Box>
          <Box px="6" py="5" maxW="container.sm" mx="auto" bg="white">
            <Text textStyle="h6" fontWeight="bold" pb="5" color="text.300">
              支払いに失敗しました。
            </Text>
            <Text color="action.notification">
              前回のメンバーシップ更新時に、サブスクリプションのご請求を試みましたが失敗しました。
              サブスクリプションを継続するには、請求情報（支払い情報）を更新してください。
            </Text>
            <Box pt="30px" pb="5px">
              <Link href={'/user/membership/payment'} passHref>
                <Button
                  bg="action.assistant"
                  color="white"
                  border="1px"
                  borderColor="action.assistant"
                  width="100%"
                  minHeight="48px"
                  fontSize="16px"
                >
                  請求先情報の更新をお願いします
                </Button>
              </Link>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default MembershipPaymentStatusCard;
