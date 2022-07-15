import { Alert, Box, Text, chakra, AlertIcon } from '@chakra-ui/react';
import MembershipInfoCard from 'components/organisms/MembershipInfoCard';
import MembershipPaymentSettingCard from 'components/organisms/MembershipPaymentSettingCard';
import MembershipPaymentStatusCard from 'components/organisms/MembershipPaymentStatusCard';
import MembershipSettingCard from 'components/organisms/MembershipCancellationButton';
import React from 'react';
import { Membership } from 'type/viewModel/common/membership';
import { Button } from 'components/atoms/Button';
import { MembershipInfo } from 'type/viewModel/membershipInfo';
import Link from 'next/link';
import MembershipCancellationButton from 'components/organisms/MembershipCancellationButton';
import MembershipNoficationBar from 'components/organisms/MembershipNoficationBar';

type Props = {
  membership: Membership;
};

const MembershipSettingTemplate: React.VFC<Props> = ({ membership }) => {
  return (
    <Box pt="5" pb="11" bg="bg.200" minH="100vh">
      <Text textStyle="h4" mb="5" mx="20px">
        メンバーシップ設定
      </Text>
      <MembershipNoficationBar membership={membership} />
      <MembershipInfoCard membership={membership} />
      <MembershipPaymentStatusCard membership={membership} />
      <MembershipPaymentSettingCard membership={membership} />
      {!membership.stripeSubscription.willCancelAtPeriodEnd && (
        <MembershipCancellationButton mx="auto" membership={membership} />
      )}
    </Box>
  );
};

export default MembershipSettingTemplate;
