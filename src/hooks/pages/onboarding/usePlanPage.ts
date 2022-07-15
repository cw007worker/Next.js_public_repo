import {
  useGetMembershipPlans,
  HookState as MembershipPlansState,
} from 'hooks/useGetMembershipPlans';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MembershipPlan } from 'type/viewModel/common/membershipPlan';
import { useRouter } from 'next/router';

export type HookState = {
  membershipPlans: MembershipPlansState;
  handleSubmit: () => void;
  selectedPlan: MembershipPlan | undefined;
  isSelectedPlan: (membershipPlanId: string) => boolean;
  handleSelectedPlan: (membershipPlan: MembershipPlan) => void;
};

export const usePlanPage = (): HookState => {
  const router = useRouter();
  const [selectedPlan, setSeledtedPlan] = useState<MembershipPlan | undefined>(
    undefined
  );
  const membershipPlans = useGetMembershipPlans();

  const handleSubmit = useCallback(() => {
    if (selectedPlan === undefined)
      throw new Error('プランidが選択されていません');

    router.push({
      pathname: '/onboarding/payment',
      query: { membershipPlanId: selectedPlan.id },
    });
  }, [selectedPlan]);

  const isSelectedPlan = useCallback(
    (membershipPlanId: string) => {
      return membershipPlanId === selectedPlan?.id;
    },
    [selectedPlan]
  );

  const handleSelectedPlan = (membershipPlan: MembershipPlan) => {
    if (isSelectedPlan(membershipPlan.id)) {
      setSeledtedPlan(undefined);
    } else {
      setSeledtedPlan(membershipPlan);
    }
  };

  const heilightedPlan = useMemo(() => {
    if (membershipPlans.state?.type !== 'loaded') return undefined;

    const _heilightedPlan = membershipPlans.state.data.membershipPlans.find(
      (plan) => plan.isHighlighted
    );
    return _heilightedPlan;
  }, [membershipPlans.state, membershipPlans.state?.type]);

  useEffect(() => {
    if (heilightedPlan === undefined) return;

    return setSeledtedPlan(heilightedPlan);
  }, [heilightedPlan]);

  return {
    membershipPlans,
    handleSubmit,
    selectedPlan,
    handleSelectedPlan,
    isSelectedPlan,
  };
};
