import {
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useUserContext } from 'context/userContext';
import { useFirebaseUser } from 'hooks/useFirebaseUser';
import router from 'next/router';

export type HookState = {
  isReStartOnboarding: boolean;
  reStartOnboarding: (event: any) => void;
};

export const useRestartOnboardingHandler = (): HookState => {
  const [isReStartOnboarding, setisReStartOnboarding] = useState(false);
  const firebaseUser = useFirebaseUser();
  const user = useUserContext();
  const isUser = useMemo(() => isSuccessState(user), [user]);
  const isLoadingUser = useMemo(
    () => isInitState(user) || isLoadingState(user),
    [user]
  );

  const hasFirebaseAccount = useMemo(
    () => firebaseUser !== null,
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

  /**
   * オンボーディングを離脱したユーザーだった場合、離脱したonboardingページまで飛ばす
   */
  const reStartOnboarding = useCallback(
    (event) => {
      event.preventDefault();
      if (isLoadingUser) return;
      // firebase userのloading中
      if (hasMembership) {
        router.push('/');
        return;
      }
      if (!hasFirebaseAccount) {
        router.push('/onboarding');
        return;
      }
      if (hasFirebaseAccount) {
        if (!isPassword) {
          router.push('/onboarding/register');
          return;
        }
        if (!isPhone) {
          router.push('/onboarding/phone');
          return;
        }
        if (!isPayment) {
          router.push('/onboarding/plan');
          return;
        }
      } else {
        return;
      }
    },
    [
      isReStartOnboarding,
      hasFirebaseAccount,
      hasMembership,
      isLoadingUser,
      isPassword,
      isPayment,
      isPhone,
      user,
    ]
  );

  useEffect(() => {
    if (isLoadingUser) {
      return;
    }
    // ログイン済み && membershipユーザーはrootに飛ばす
    if (hasMembership) {
      router.push('/');
      return;
    }
    // ログイン済み && membershipユーザーでは無い場合は、onboardingを再開可能な状態にする
    if (isUser) {
      setisReStartOnboarding(true);
    }
  }, [isLoadingUser, hasMembership, isUser, user]);

  return {
    isReStartOnboarding,
    reStartOnboarding,
  };
};
