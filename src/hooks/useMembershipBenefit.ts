import {
  MembershipBenefit,
  membershipBenefits,
} from 'constants/membershipBenefits';
import { useUserContext } from 'context/userContext';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { isSuccessState } from 'type/util/fetchData';

export type HookState = {
  membershipBenefitList: MembershipBenefit[];
};

export const useMembershipBenefit = () => {
  const me = useUserContext();

  const membershipBenefitList = useMemo(() => {
    return isSuccessState(me)
      ? membershipBenefits(me.data.membershipGrade)
      : undefined;
  }, [me]);

  return membershipBenefitList;
};
