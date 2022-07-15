import { Box, Text } from '@chakra-ui/react';
import { RoundedLinkBox } from 'components/molecules/RoundedLinkBox';
import { RoundedTextBox } from 'components/molecules/RoundedTextBox';
import { CartItemsCard } from 'components/organisms/CartItemsCard';
import FixedBottomButton from 'components/organisms/FixedBottomButton';
import { PriceInfoCard } from 'components/organisms/PriceInfoCard';
import { DeliveryInfoCard } from 'components/organisms/DeliveryInfoCard';
import { HookState } from 'hooks/pages/useOrderConfirmPage';
import { zipcodeFormat } from 'utils/zipcodeFormat';
import React from 'react';
import { RoundedChangeableBox } from 'components/molecules/RoundedChangeableBox';
import { SelectCouponOpenButton } from 'components/organisms/SelectCouponOpenButton';

const Component: React.VFC<Omit<HookState, 'pageState'>> = (props) => {
  const {
    orderInfo,
    defautPaymentWay,
    paymentWays,
    handleSubmit,
    orderState,
    toggleShippingAddresOpen,
    togglePaymentWayEditer,
    toggleCouponOpen,
    selectCouponHookState,
  } = props;

  if (orderInfo) {
    const {
      subtotalPrice,
      deliveryFee,
      deliveryInfo,
      usagePoints,
      totalPrice,
      cartItems,
      shippingAddress,
    } = orderInfo;

    const { appliedCoupon } = selectCouponHookState;
    return (
      <Box>
        <Box px="3" pt="5" pb="44" maxWidth="xl" mx="auto" bg="bg.200">
          <Text textStyle="h5" mb="2">
            お届け先情報
          </Text>
          <RoundedChangeableBox
            mb="5"
            handleClick={toggleShippingAddresOpen}
            info={
              shippingAddress &&
              `${zipcodeFormat(shippingAddress.zipcode)},${
                shippingAddress.prefecture
              },${shippingAddress.address},${shippingAddress.buildingName}`
            }
            placeholder="お届け先情報を登録してください"
          />
          <Text textStyle="h5" mb="2">
            お支払い情報
          </Text>

          <RoundedChangeableBox
            mb="10"
            handleClick={togglePaymentWayEditer}
            info={
              defautPaymentWay !== undefined
                ? `${defautPaymentWay.brand} 下4桁 ${defautPaymentWay.last4}`
                : undefined
            }
            placeholder="カード情報を登録してください"
          />

          <Text textStyle="h5" mb="2">
            配送情報
          </Text>
          <DeliveryInfoCard deliveryInfo={deliveryInfo} mb="10" />

          <SelectCouponOpenButton
            handleClick={toggleCouponOpen}
            discountPrice={appliedCoupon?.validationResult?.totalDiscountPrice}
            mb="2"
          />

          <PriceInfoCard
            subtotalPrice={subtotalPrice}
            deliveryFee={deliveryFee}
            totalPrice={
              appliedCoupon?.validationResult?.totalPrice
                ? totalPrice -
                  appliedCoupon?.validationResult?.totalDiscountPrice
                : totalPrice
            }
            usagePoints={usagePoints}
            mb="10"
          />
          <Text textStyle="h5" mb="2">
            買い物カゴ
          </Text>
          <CartItemsCard cartItems={cartItems} />
        </Box>
        {defautPaymentWay && shippingAddress ? (
          <FixedBottomButton
            onClick={(e) =>
              handleSubmit(
                e,
                defautPaymentWay.stripeCardId,
                shippingAddress.id,
                appliedCoupon?.code
              )
            }
            isLoading={orderState?.type === 'loading'}
          >
            注文を確定する
          </FixedBottomButton>
        ) : (
          <FixedBottomButton isDisabled={true}>
            注文を確定する
          </FixedBottomButton>
        )}
      </Box>
    );
  }
  return null;
};

export const OrderConfirmTemplate = React.memo(Component);
