import MembershipSettingPlanTemplate from 'components/templates/MembershipSettingPlan';
import router from 'next/router';
import { Loading } from 'components/molecules/Loading';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { useMembershipPlanPage } from 'hooks/pages/user/useMembershipPlanPage';
import { LayoutWithBack } from 'components/organisms/Layout/withBack';
import React from 'react';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import NormalButton from 'components/atoms/NormalButton';
import { MembershipPlanConfirmModal } from 'components/templates/MembershipPlanConfirmModal';
import { useOnboardingRoutingHandler } from 'hooks/pages/onboarding/useOnboardingRoutingHandler';

const MembershipSettingPlan = () => {
  useOnboardingRoutingHandler;
  const {
    pageState,
    layoutState,
    handleSubmit,
    selectedPlan,
    isSelectedPlan,
    handleSelectedPlan,
    canGo,
    isSubmitting,
    isOpenConfirmModal,
    onCloseConfirmModal,
    onOpenConfirmModal,
    currentSubscribedMembershipPlan,
  } = useMembershipPlanPage();

  return (
    <React.Fragment>
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
          <MembershipSettingPlanTemplate
            membershipPlans={pageState.membershipPlans.membershipPlans}
            membership={pageState.membership}
            selectedPlan={selectedPlan}
            isSelectedPlan={isSelectedPlan}
            handleSelectedPlan={handleSelectedPlan}
            onOpenConfirmModal={onOpenConfirmModal}
            canGo={canGo}
          />
        )}
      </LayoutWithBack>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpenConfirmModal}
        onClose={onCloseConfirmModal}
      >
        <ModalOverlay />
        <MembershipPlanConfirmModal
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          selectedPlan={selectedPlan}
          currentSubscribedMembershipPlan={currentSubscribedMembershipPlan}
          onCloseConfirmModal={onCloseConfirmModal}
        />
      </Modal>
    </React.Fragment>
  );
};

export default MembershipSettingPlan;
