import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import {
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { useLayout, HookState as layoutState } from 'hooks/useLayout';
import {
  useGetMembershipInfo,
  HookState as membershipInfoHookState,
} from 'hooks/useGetMembershipInfo';
import {
  useGetPaymentWays,
  HookState as paymentWaysHookState,
} from 'hooks/useGetPaymentWays';

export type HookState = {
  membership: membershipInfoHookState;
  layoutState: layoutState;
};

export const useMembershipSettingPage = () => {
  const membership = useGetMembershipInfo();
  const layoutState = useLayout();

  return {
    membership,
    layoutState,
  };
};
