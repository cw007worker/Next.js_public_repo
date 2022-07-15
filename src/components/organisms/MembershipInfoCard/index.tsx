import React from 'react';
import { Box, BoxProps, Divider, Text, chakra } from '@chakra-ui/react';
import { MembershipInfo } from 'type/viewModel/membershipInfo';
import { Button } from 'components/atoms/Button';
import Link from 'next/link';
import { periodHumanReadable } from 'utils/calender';

type Props = {
  membership: MembershipInfo;
} & BoxProps;
const MembershipInfoCard: React.FC<Props> = ({ membership, ...rest }) => {
  return (
    <>
      <Box>
        <Text textStyle="h8" py="2" mt="5" mx="20px" color="text.400">
          メンバーシップ情報
        </Text>
      </Box>
      <Box px="6" py="5" maxW="container.sm" mx="auto" bg="white">
        <Box py="1">
          <Text textStyle="h6" color="text.300" fontWeight="bold">
            {membership.currentSubscribedMembershipPlan.name}
          </Text>
          <Text p="2">
            <chakra.span textStyle="h3">
              ￥{membership.currentSubscribedMembershipPlan.price}
            </chakra.span>
            /
            {periodHumanReadable(
              membership.currentSubscribedMembershipPlan.recurring
            )}
          </Text>
        </Box>
        <Box py="1">
          <Text textStyle="h8" color="text.300" fontWeight="bold">
            {membership.stripeSubscription.willCancelAtPeriodEnd
              ? `解約予定日：${membership.stripeSubscription.currentPeriodEndDate}`
              : `登録年月：${membership.stripeSubscription.contractStartDate}`}
          </Text>
        </Box>
        {!membership.stripeSubscription.willCancelAtPeriodEnd && (
          <Box pt="10px" pb="5px">
            <Link href={'/user/membership/setting/plan'} passHref>
              <Button
                bg="white"
                color="action.assistant"
                border="1px"
                borderColor="action.assistant"
                width="100%"
                minHeight="48px"
              >
                プランを変更
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </>
  );
};

export default MembershipInfoCard;
