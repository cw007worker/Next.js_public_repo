import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  VStack,
} from '@chakra-ui/react';
import { Button } from 'components/atoms/Button';
import { TextFieldWithBoarder } from 'components/atoms/TextField/withBorder';
import { Loading } from 'components/molecules/Loading';
import { ActiveCouponCard } from 'components/organisms/CouponCard/active';
import { InactiveCouponCard } from 'components/organisms/CouponCard/inactive';
import { CouponTabs } from 'components/organisms/CouponTabs';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { HookState } from 'hooks/pages/useCouponPage';
import React from 'react';

export const CouponTemplate: React.VFC<Omit<HookState, 'layoutState'>> = ({
  userCouponsState,
  activeCoupons,
  inactiveCoupons,
  currentTab,
  showActiveCoupons,
  showInactiveCoupons,
  addRequest,
  isAddLoading,
  register,
  handleSubmit,
  errors,
}) => {
  return (
    <Box bgColor="#FAFAFA" minH="100vh">
      <CouponTabs
        currentTab={currentTab}
        showActiveCoupons={showActiveCoupons}
        showInactiveCoupons={showInactiveCoupons}
      />
      {currentTab === 'activeCoupons' && (
        <Box px="3" pt="5">
          <form onSubmit={handleSubmit(addRequest)}>
            <Flex>
              <FormControl isInvalid={errors.code} w="full">
                <TextFieldWithBoarder
                  placeholder="クーポンコード"
                  h="12"
                  {...register('code', {
                    required: 'クーポンコードを入力してください',
                  })}
                />
                <FormErrorMessage>
                  {errors.code && errors.code.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                ml="2.5"
                h="12"
                minW="120px"
                type="submit"
                isLoading={isAddLoading}
              >
                獲得
              </Button>
            </Flex>
          </form>
        </Box>
      )}
      {userCouponsState === undefined || userCouponsState.type === 'loading' ? (
        <Loading />
      ) : userCouponsState.type === 'error' ? (
        <ErrorFetchFaild
          message="クーポンが取得できませんでした。"
          includeSubMessage={false}
        />
      ) : (
        <VStack spacing={5} align="stretch" px="3" py="5">
          {currentTab === 'activeCoupons'
            ? activeCoupons.map((activeCoupon, index) => (
                <ActiveCouponCard key={index} userCoupon={activeCoupon} />
              ))
            : inactiveCoupons.map((inactiveCoupon, index) => (
                <InactiveCouponCard
                  key={index}
                  userCoupon={inactiveCoupon}
                  isExpired={true}
                />
              ))}
        </VStack>
      )}
    </Box>
  );
};
