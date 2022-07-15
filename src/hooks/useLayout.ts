import { useUserContext } from 'context/userContext';
import router from 'next/router';
import { useMemo, useState, useEffect } from 'react';
import { isSuccessState } from 'type/util/fetchData';
import { MembershipGrade } from 'type/viewModel/me';

export type HookState = {
  isMembership: boolean | undefined;
  shouldCompleteOnboarding: boolean;
  fullName: string | undefined;
  cartItemCount: number | undefined;
  currentPage: string | undefined;
  membershipGrade: MembershipGrade;
};

export const useLayout = (): HookState => {
  const state = useUserContext();
  const fullName = useMemo(
    () =>
      isSuccessState(state) && state.data.isMembership
        ? `${state.data.firstName}　${state.data.lastName} `
        : undefined,
    [state]
  );
  const cartItemCount = useMemo(
    () => (isSuccessState(state) ? state.data.cartItemCount : undefined),
    [state]
  );

  const isMembership = useMemo(
    () => (isSuccessState(state) ? state.data.isMembership : undefined),
    [state]
  );

  const shouldCompleteOnboarding = useMemo(
    () => Boolean(isSuccessState(state) && !isMembership && state.data.email),
    [state]
  );

  const membershipGrade = useMemo(
    () => (isSuccessState(state) ? state.data.membershipGrade : undefined),
    [state]
  );

  const [currentPage, setCurrentPage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPage(router.pathname);
    }
  }, []);

  return {
    isMembership,
    shouldCompleteOnboarding,
    fullName,
    cartItemCount,
    currentPage,
    membershipGrade,
  };
};
