import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useUpdateUserContext, useUserContext } from 'context/userContext';
import router, { Router, useRouter } from 'next/router';
import {
  isSuccessState,
  isFailState,
  isLoadingState,
  isInitState,
} from 'type/util/fetchData';
import { useFirebaseUser } from 'hooks/useFirebaseUser';

export const useOnboardingRoutingHandler = () => {
  const router = useRouter();
  const firebaseUser = useFirebaseUser();
  const user = useUserContext();
  const refetchUser = useUpdateUserContext();
  const isLoadingUser = useMemo(
    () => isInitState(user) || isLoadingState(user),
    [user]
  );
  const isMounted = useRef<boolean>(false);

  const isError = useMemo(() => isFailState(user), [user]);

  const hasFirebaseAccount = useMemo(
    () => firebaseUser !== null,
    [firebaseUser]
  );

  const isInitFirebaseAccount = useMemo(
    () => firebaseUser === undefined,
    [firebaseUser]
  );

  const isPhone = useMemo(
    () => isSuccessState(user) && user.data.phoneNumber !== undefined,
    [user]
  );

  const isPassword = useMemo(
    () => isSuccessState(user) && user.data.hasPassword,
    [user]
  );

  const isPayment = useMemo(
    () => isSuccessState(user) && user.data.isMembership,
    [user]
  );

  const hasMembership = useMemo(
    () => isSuccessState(user) && user.data.isMembership,
    [user]
  );

  const IsPaymentPageCurrent = useMemo(
    () =>
      router.pathname == '/onboarding/payment' &&
      router.query.membershipPlanId !== undefined,
    [router, router.pathname, router.query]
  );

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      refetchUser();
    }
  }, [refetchUser]);

  useEffect(() => {
    if (isLoadingUser) return;
    // firebase userのloading中
    if (isInitFirebaseAccount) return;
    //personalizeは認可を必要しない
    if (hasMembership && router.pathname === '/onboarding/personalize') {
      return;
    }
    if (hasMembership) {
      router.replace('/');
      return;
    }
    if (!hasFirebaseAccount) {
      router.replace('/onboarding/register');
      return;
    }
    // TODO: error だったら sign inに飛ばしたい
    if (hasFirebaseAccount) {
      if (!isPassword) {
        router.replace('/onboarding/register');
        return;
      }
      if (!isPhone) {
        router.replace('/onboarding/phone');
        return;
      }
      if (!isPayment && IsPaymentPageCurrent) {
        // NOTE: 支払いのみが完了しておらず、payment pageにいる場合は何もしない
        return;
      } else {
        router.replace('/onboarding/plan');
        return;
      }
    } else {
      //TODO: 500ページに飛ばしたい
    }
  }, [
    hasFirebaseAccount,
    hasMembership,
    isError,
    isInitFirebaseAccount,
    isLoadingUser,
    isPassword,
    isPayment,
    isPhone,
    IsPaymentPageCurrent,
    user,
  ]);

  return {
    user,
    isLoadingUser,
    isPassword,
    hasMembership,
  };
};
