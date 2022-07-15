import { State as UserState } from 'hooks/useGetMe';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { isPublicPathForApp, isPublicPathForWeb } from 'utils/isPublicPath';
import { useAppState } from './useAppState';

type RedirectCondition = (
  user: Extract<
    UserState,
    | { isLoading: false; error: undefined }
    | { isLoading: false; data: undefined; error: string }
  >
) => boolean;

const isMembership: RedirectCondition = (user) => {
  return isSuccessState(user) && user.data.isMembership;
};

export const useRoutingHandler = (user: UserState) => {
  const router = useRouter();
  const { pathname, query } = router;
  const { isApp } = useAppState();
  useEffect(() => {
    if (isInitState(user) || isLoadingState(user)) {
      return;
    }

    if (isApp) {
      if (!isMembership(user) && !isPublicPathForApp(pathname)) {
        router.replace('/onboarding');
      }
    } else {
      // 初売り実施期間中（1/30まで）はweb側のリダイレクト先もonboardingにする
      if (!isMembership(user) && !isPublicPathForWeb(pathname)) {
        router.replace('/onboarding');
      }
    }
  }, [isApp, pathname, query, router, user]);
};
