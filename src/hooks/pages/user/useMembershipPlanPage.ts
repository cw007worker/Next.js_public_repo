import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLayout, HookState as layoutState } from 'hooks/useLayout';
import {
  useGetMembershipInfo,
  HookState as membershipInfoHookState,
} from 'hooks/useGetMembershipInfo';
import { useGetMembershipPlans } from 'hooks/useGetMembershipPlans';
import { MembershipInfo } from 'type/viewModel/membershipInfo';
import { MembershipPlan } from 'type/viewModel/common/membershipPlan';
import { MembershipPlans } from 'type/viewModel/membershipPlans';
import { useSubscribeMembershipPlan } from 'hooks/useSubscribeMembershipPlan';
import { useDisclosure } from '@chakra-ui/react';

type INIT = undefined;

type LOADING = { type: 'loading' };

export type ALL_LOADED = {
  type: 'loaded';
  membership: MembershipInfo;
  membershipPlans: MembershipPlans;
};

type ERROR = { type: 'error'; message: string };

type PageState = INIT | ALL_LOADED | ERROR | LOADING;

export type HookState = {
  pageState: PageState;
  layoutState: layoutState;
  handleSubmit: () => void;
  selectedPlan: MembershipPlan | undefined;
  isSelectedPlan: (membershipPlanId: string) => boolean;
  canGo: boolean;
  handleSelectedPlan: (membershipPlan: MembershipPlan) => void;
  isSubmitting: boolean;
  isOpenConfirmModal: boolean;
  onCloseConfirmModal: () => void;
  onOpenConfirmModal: () => void;
  currentSubscribedMembershipPlan: MembershipPlan | undefined;
};

export const useMembershipPlanPage = (): HookState => {
  const membershipPlans = useGetMembershipPlans();
  const [selectedPlan, setSeledtedPlan] = useState<MembershipPlan | undefined>(
    undefined
  );
  const membership = useGetMembershipInfo();
  const layoutState = useLayout();
  const [pageState, setPageState] = useState<PageState>(undefined);
  const { state, request, isSubmitting } = useSubscribeMembershipPlan();
  const {
    isOpen: isOpenConfirmModal,
    onClose: onCloseConfirmModal,
    onOpen: onOpenConfirmModal,
  } = useDisclosure();

  // 現在購読中のメンバーシッププラン
  const currentSubscribedMembershipPlan = useMemo(() => {
    if (pageState?.type !== 'loaded') return;

    let currentSubscribedMembershipPlanId =
      pageState.membership.currentSubscribedMembershipPlan.membershipPlanid;

    return pageState.membershipPlans.membershipPlans.find(
      (plan) => plan.id === String(currentSubscribedMembershipPlanId)
    );
  }, [pageState]);

  const handleSubmit = useCallback(() => {
    if (selectedPlan === undefined)
      throw new Error('プランidが選択されていません');
    if (pageState?.type !== 'loaded')
      throw new Error('ページの読み込みが完了していません');

    request(Number(selectedPlan.id), pageState.membership.id);
  }, [selectedPlan]);

  const isSelectedPlan = useCallback(
    (membershipPlanId: string) => {
      return membershipPlanId === selectedPlan?.id;
    },
    [selectedPlan]
  );

  const handleSelectedPlan = useCallback((membershipPlan: MembershipPlan) => {
    if (isSelectedPlan(membershipPlan.id)) {
      setSeledtedPlan(undefined);
    } else {
      setSeledtedPlan(membershipPlan);
    }
  }, []);

  const canGo = useMemo(() => {
    return Boolean(
      selectedPlan && selectedPlan.id !== currentSubscribedMembershipPlan?.id
    );
  }, [currentSubscribedMembershipPlan, selectedPlan]);

  useEffect(() => {
    if (currentSubscribedMembershipPlan === undefined) return;

    return setSeledtedPlan(currentSubscribedMembershipPlan);
  }, [currentSubscribedMembershipPlan]);

  useEffect(() => {
    if (
      membership.state?.type === 'loaded' &&
      membershipPlans.state?.type === 'loaded'
    ) {
      return setPageState({
        type: 'loaded',
        membership: membership.state.data,
        membershipPlans: membershipPlans.state.data,
      });
    }
  }, [membership.state, membershipPlans.state]);

  // TODO: error 時のmessageを複数入れられるようにする
  // 現状エラーメッセージの表示をしてないので、もし表示する場合に上記対応が必要になる
  useEffect(() => {
    switch (membershipPlans.state?.type) {
      case 'loading':
        return setPageState({
          type: 'loading',
        });
      case 'error':
        return setPageState({
          type: 'error',
          message: membershipPlans.state.message,
        });
      default:
        break;
    }
  }, [membershipPlans]);

  useEffect(() => {
    switch (membership.state?.type) {
      case 'loading':
        break;
      case 'error':
        return setPageState({
          type: 'error',
          message: membership.state.message,
        });
      default:
        break;
    }
  }, [membership]);

  return {
    pageState,
    layoutState,
    handleSubmit,
    selectedPlan,
    handleSelectedPlan,
    isSelectedPlan,
    canGo,
    isSubmitting,
    isOpenConfirmModal,
    onCloseConfirmModal,
    onOpenConfirmModal,
    currentSubscribedMembershipPlan,
  };
};
