import { Heading, Slide, Box } from '@chakra-ui/react';
import { Loading } from 'components/molecules/Loading';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import router from 'next/router';
import { ModalLayout } from 'components/organisms/ModalLayout';
import { EnterShippingAddressTemplate } from 'components/templates/EnterShippingAddress';
import { OrderConfirmTemplate } from 'components/templates/OrderConfirm';
import { Props as AddNewCardProps } from 'components/templates/Drawer/AddNewCard';
import { Props as PaymentWayEditerProps } from 'components/templates/Drawer/PaymentWayEditer';
import { useOrderConfirmPage } from 'hooks/pages/useOrderConfirmPage';
import React from 'react';
import dynamic from 'next/dynamic';
import { Props as SelectCouponProps } from 'components/templates/Drawer/SelectCoupon';
import { LayoutWithBack } from 'components/organisms/Layout/withBack';
import { css } from '@emotion/react';

const AddNewCardTemplate = dynamic<AddNewCardProps>(() =>
  import('components/templates/Drawer/AddNewCard').then(
    (module) => module.AddNewCardTemplate
  )
);
const PaymentWayEditerTemplate = dynamic<PaymentWayEditerProps>(() =>
  import('components/templates/Drawer/PaymentWayEditer').then(
    (module) => module.PaymentWayEditerTemplate
  )
);

const SelectCouponTemplate = dynamic<SelectCouponProps>(() =>
  import('components/templates/Drawer/SelectCoupon').then(
    (module) => module.SelectCouponTemplate
  )
);

const OrderConfirm = () => {
  const hookState = useOrderConfirmPage();

  return (
    <React.Fragment>
      <LayoutWithBack
        handleBack={() => router.back()}
        cartItemCount={hookState.layoutState.cartItemCount}
      >
        {hookState.pageState === undefined ||
        hookState.pageState.type === 'loading' ? (
          <Loading />
        ) : hookState.pageState.type === 'error' ? (
          <ErrorFetchFaild
            message="注文情報を取得できませんでした"
            includeSubMessage={true}
            linkProps={{ path: '/', text: 'ホームへ戻る' }}
          />
        ) : (
          <OrderConfirmTemplate {...hookState} />
        )}
      </LayoutWithBack>

      <Slide
        direction="right"
        in={hookState.isShippingAddressOpen}
        unmountOnExit
        css={css`
          z-index: 2000;
        `}
      >
        <Box height="full" overflow="scroll">
          <ModalLayout handleBack={hookState.toggleShippingAddresOpen}>
            <EnterShippingAddressTemplate
              shippingAddress={hookState.orderInfo?.shippingAddress}
              reload={hookState.reload}
            />
          </ModalLayout>
        </Box>
      </Slide>

      <Slide
        direction="right"
        in={hookState.isPaymentWayEditer}
        unmountOnExit
        css={css`
          z-index: 2000;
        `}
      >
        <Box h="full" overflow="scroll">
          <ModalLayout
            handleBack={() => {
              hookState.togglePaymentWayEditer();
              hookState.reload();
            }}
          >
            {hookState.pageState === undefined ||
            hookState.pageState.type === 'loading' ? (
              <Loading />
            ) : hookState.pageState.type === 'error' ? (
              <ErrorFetchFaild
                message="注文情報を取得できませんでした"
                includeSubMessage={true}
                linkProps={{ path: '/', text: 'ホームへ戻る' }}
              />
            ) : (
              <PaymentWayEditerTemplate
                paymentWays={hookState.paymentWays}
                toggleAddNewCard={hookState.toggleAddNewCard}
                handleUpdateDefaultPaymentWay={
                  hookState.handleUpdateDefaultPaymentWay
                }
                isLoading={hookState.isUpdateDefaultPaymentWayLoading}
                handleChangeCardId={hookState.handleChangeCardId}
                cardId={hookState.cardId}
                defaultCardId={hookState.defaultCardId}
              />
            )}
          </ModalLayout>
        </Box>
      </Slide>

      <Slide
        direction="right"
        in={hookState.isAddNewCard}
        unmountOnExit
        css={css`
          z-index: 2000;
        `}
      >
        <Box h="full" overflow="scroll">
          <ModalLayout
            handleBack={() => {
              hookState.toggleAddNewCard();
              hookState.reload();
            }}
          >
            {hookState.pageState === undefined ||
            hookState.pageState.type === 'loading' ? (
              <Loading />
            ) : hookState.pageState.type === 'error' ? (
              <ErrorFetchFaild
                message="注文情報を取得できませんでした"
                includeSubMessage={true}
                linkProps={{ path: '/', text: 'ホームへ戻る' }}
              />
            ) : (
              <AddNewCardTemplate
                handleAddNewCard={hookState.handleAddNewCard}
                isLoading={hookState.isAddNewCardLoading}
              />
            )}
          </ModalLayout>
        </Box>
      </Slide>

      <Slide
        direction="right"
        in={hookState.isCouponOpen}
        css={css`
          z-index: 2000;
        `}
      >
        <Box h="full" overflow="scroll">
          <ModalLayout
            handleBack={() => {
              hookState.handleApplyCoupon();
            }}
          >
            <SelectCouponTemplate
              handleApplyCoupon={hookState.handleApplyCoupon}
              {...hookState.selectCouponHookState}
            />
          </ModalLayout>
        </Box>
      </Slide>
    </React.Fragment>
  );
};

export default OrderConfirm;
