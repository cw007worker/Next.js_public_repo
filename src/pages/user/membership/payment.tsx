import React from 'react';
import MembershipPaymentTemplate from 'components/templates/MembershipPayment';
import router from 'next/router';
import { Loading } from 'components/molecules/Loading';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { LayoutWithBack } from 'components/organisms/Layout/withBack';
import { useMembershipPaymentPage } from 'hooks/pages/user/userMembershipPaymentPage';
import { Slide, Box } from '@chakra-ui/react';
import { ModalLayout } from 'components/organisms/ModalLayout';
import { AddNewCardTemplate } from 'components/templates/Drawer/AddNewCard';

const MembershipPayment = () => {
  const state = useMembershipPaymentPage();
  const { pageState, layoutState } = state;

  return (
    <>
      <LayoutWithBack
        handleBack={() => router.back()}
        cartItemCount={layoutState.cartItemCount}
        headerPageTitle="マイページ"
      >
        {pageState === undefined || pageState.type === 'loading' ? (
          <Loading />
        ) : pageState.type === 'error' ? (
          <ErrorFetchFaild
            message="ユーザー情報の取得に失敗しました"
            includeSubMessage={true}
            linkProps={{ path: '/', text: 'ホームへ戻る' }}
          />
        ) : (
          <MembershipPaymentTemplate
            paymentWays={pageState.data.paymentWays}
            toggleAddNewCard={state.toggleAddNewCard}
            handleUpdateDefaultPaymentWay={state.handleUpdateDefaultPaymentWay}
            isLoading={state.isUpdateDefaultPaymentWayLoading}
            handleChangeCardId={state.handleChangeCardId}
            cardId={state.cardId}
            defaultCardId={state.defaultCardId}
          />
        )}
      </LayoutWithBack>
      <Slide direction="right" in={state.isAddNewCard} unmountOnExit>
        <Box h="full" overflow="scroll">
          <ModalLayout
            handleBack={() => {
              state.toggleAddNewCard();
              state.reload();
            }}
          >
            {state.pageState === undefined ||
            state.pageState.type === 'loading' ? (
              <Loading />
            ) : state.pageState.type === 'error' ? (
              <ErrorFetchFaild
                message="ユーザー情報の取得に失敗しました"
                includeSubMessage={true}
                linkProps={{ path: '/', text: 'ホームへ戻る' }}
              />
            ) : (
              <AddNewCardTemplate
                handleAddNewCard={state.handleAddNewCard}
                isLoading={state.isAddNewCardLoading}
              />
            )}
          </ModalLayout>
        </Box>
      </Slide>
    </>
  );
};

export default MembershipPayment;
