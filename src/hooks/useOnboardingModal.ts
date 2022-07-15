import { useDisclosure } from '@chakra-ui/react';
import { State as UserState } from 'hooks/useGetMe';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
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

export type HookState = {
  isOpenOnboardingDrawer: boolean;
};

export const useOnboardingModal = (user: UserState) => {
  const router = useRouter();
  const { pathname, query } = router;
  const { isApp } = useAppState();
  const {
    isOpen: isOpenOnboardingDrawer,
    onClose: onCloseisOpenOnboardingDrawer,
    onOpen: onOpenOnboardingDrawer,
  } = useDisclosure();

  useEffect(() => {
    if (isInitState(user) || isLoadingState(user)) {
      return;
    }
    if (!isMembership(user) && !isPublicPathForApp(pathname)) {
      onOpenOnboardingDrawer();
    }

    // clean up
    return () => onCloseisOpenOnboardingDrawer();
  }, [isApp, pathname, query, router, user]);

  return {
    isOpenOnboardingDrawer,
  };
};
