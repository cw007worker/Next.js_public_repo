import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { TextFieldWithBoarder } from 'components/atoms/TextField/withBorder';
import { Loading } from 'components/molecules/Loading';
import { ActiveCouponCard } from 'components/organisms/CouponCard/active';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import React from 'react';
import { HookState as SelectCouponHookState } from 'hooks/useSelectCoupon';
import { Button } from 'components/atoms/Button';
import { SelectableCouponCard } from 'components/organisms/CouponCard/selectable';
import { CouponTabsForCart } from 'components/organisms/CouponTabs/forCart';
import { InactiveCouponCard } from 'components/organisms/CouponCard/inactive';

export type Props = {
  handleApplyCoupon: () => void;
} & SelectCouponHookState;
export const SelectCouponTemplate: React.VFC<Props> = ({
  state: CouponsForCartState,
  useableCoupons,
  unuseableCoupons,
  currentTab,
  showUseableCoupons,
  showUnuseableCoupons,
  addRequest,
  isAddLoading,
  register,
  handleSubmit,
  errors,
  selectCoupon,
  applyCoupon,
  isSelectedCoupon,
  selectedCoupon,
  handleApplyCoupon,
}) => {
  return (
    <Box bg="#FAFAFA" minH="100vh" pb="28">
      <CouponTabsForCart
        currentTab={currentTab}
        showUseableCoupons={showUseableCoupons}
        showUnuseableCoupons={showUnuseableCoupons}
        position="sticky"
        top="60px"
        zIndex="sticky"
      />
      {currentTab === 'useableCoupons' && (
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
      {CouponsForCartState === undefined ||
      CouponsForCartState.type === 'loading' ? (
        <Loading />
      ) : CouponsForCartState.type === 'error' ? (
        <ErrorFetchFaild
          message="クーポンが取得できませんでした。"
          includeSubMessage={false}
        />
      ) : (
        <VStack spacing={5} align="stretch" px="3" py="5">
          {currentTab === 'useableCoupons'
            ? useableCoupons.map((useableCoupon, index) => (
                <SelectableCouponCard
                  key={index}
                  userCoupon={useableCoupon}
                  handleClick={() => selectCoupon(useableCoupon)}
                  isSelectedCoupon={isSelectedCoupon(useableCoupon.id)}
                />
              ))
            : unuseableCoupons.map((unuseableCoupon, index) => (
                <InactiveCouponCard key={index} userCoupon={unuseableCoupon} />
              ))}
        </VStack>
      )}
      <Box
        position="absolute"
        left="0"
        bottom="0"
        w="full"
        borderTop="1px solid"
        borderColor="text.100"
        px="6"
        py="3"
        bg="bg.100"
      >
        <Flex mb="2.5" px="2.5" pt="1.5">
          <Text textStyle="h6">クーポン選択</Text>
          <Spacer />
          {selectedCoupon ? (
            <Text textStyle="h4" color="action.notification">
              -¥{selectedCoupon.validationResult?.totalDiscountPrice}
            </Text>
          ) : (
            <Text textStyle="h4" color="text.200">
              -¥
            </Text>
          )}
        </Flex>
        <Button
          w="full"
          h="12"
          isDisabled={!selectedCoupon}
          onClick={handleApplyCoupon}
        >
          確認
        </Button>
      </Box>
    </Box>
  );
};
