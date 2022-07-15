import { Flex } from '@chakra-ui/react';
import React from 'react';
import { CouponTab } from './tab';

type Props = {
  currentTab: 'activeCoupons' | 'inactiveCoupons';
  showActiveCoupons: () => void;
  showInactiveCoupons: () => void;
};
export const CouponTabs: React.VFC<Props> = ({
  currentTab,
  showActiveCoupons,
  showInactiveCoupons,
}) => {
  return (
    <Flex bg="white">
      <CouponTab
        isSelected={currentTab === 'activeCoupons'}
        onClick={showActiveCoupons}
      >
        未使用のクーポン
      </CouponTab>
      <CouponTab
        isSelected={currentTab === 'inactiveCoupons'}
        onClick={showInactiveCoupons}
      >
        期限切れクーポン
      </CouponTab>
    </Flex>
  );
};
