import { FlexProps } from '@chakra-ui/react';
import React from 'react';
import { DeliveryStatus } from 'type/viewModel/delivery';
import { ShippedLabel } from './shipped';
import { UnconfirmedLabel } from './unconfirmed';
import { UnshippedLabel } from './unshipped';

type Props = {
  status: DeliveryStatus;
} & FlexProps;
export const DeliveryStatusLabel: React.FC<Props> = ({ status, ...rest }) => {
  switch (status) {
    case 'unconfirmed':
      return <UnconfirmedLabel {...rest} />;
    case 'unshipped':
      return <UnshippedLabel {...rest} />;
    case 'shipped':
      return <ShippedLabel {...rest} />;
  }
};
