import React from 'react';
import {
  Alert,
  AlertIcon,
  chakra,
  BoxProps,
  Divider,
  Text,
} from '@chakra-ui/react';
import { Button } from 'components/atoms/Button';
import { CreditCardInfo } from 'components/molecules/CreditCardInfo';
import Link from 'next/link';
import { PaymentWay } from 'type/viewModel/common/paymentWay';
import { MembershipInfo } from 'type/viewModel/membershipInfo';

type Props = {
  membership: MembershipInfo;
} & BoxProps;
const MembershipNoficationBar: React.FC<Props> = ({ membership, ...rest }) => {
  const Message = () => {
    {
      switch (membership.status) {
        case 'will_be_canceled':
          return (
            <Alert status="warning">
              <AlertIcon />
              <Text fontSize="xm" lineHeight="5">
                ご利用中のプランは今回の請求期間の最終日となる
                <chakra.span fontWeight="bold">
                  {membership.stripeSubscription.currentPeriodEndDate}
                </chakra.span>
                にキャンセルされます
              </Text>
            </Alert>
          );
        default:
          return undefined;
      }
    }
  };
  return <>{Message()}</>;
};

export default MembershipNoficationBar;
