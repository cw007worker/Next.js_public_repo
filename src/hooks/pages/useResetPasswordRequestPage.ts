import { useEffect } from 'react';
import {
  useResetPasswordRequest,
  HookState as ResetPasswordRequestState,
} from 'hooks/useResetPasswordRequest';
import { useUserContext } from 'context/userContext';
import router from 'next/router';

export type HookState = {
  resetPasswordRequestState: ResetPasswordRequestState;
};

export const useResetPasswordRequestPage = (): HookState => {
  const resetPasswordRequestState = useResetPasswordRequest();

  return {
    resetPasswordRequestState,
  };
};
