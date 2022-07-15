import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';
import { CouponTab } from './tab';

type Props = {
  currentTab: 'useableCoupons' | 'unuseableCoupons';
  showUseableCoupons: () => void;
  showUnuseableCoupons: () => void;
} & FlexProps;
export const CouponTabsForCart: React.VFC<Props> = ({
  currentTab,
  showUseableCoupons,
  showUnuseableCoupons,
  ...rest
}) => {
  return (
    <Flex bg="white" {...rest}>
      <CouponTab
        isSelected={currentTab === 'useableCoupons'}
        onClick={showUseableCoupons}
      >
        利用可能
      </CouponTab>
      <CouponTab
        isSelected={currentTab === 'unuseableCoupons'}
        onClick={showUnuseableCoupons}
      >
        ご利用になれません
      </CouponTab>
    </Flex>
  );
};
