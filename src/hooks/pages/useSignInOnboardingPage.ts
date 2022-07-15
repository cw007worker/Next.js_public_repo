import { useMemo } from 'react';
import {
  useSignInWithPassword,
  HookState as SignInWithPasswordState,
} from 'hooks/useSignInWithPassword';

export type HookState = {
  signInWithPasswordState: SignInWithPasswordState;
  userEmail: string | undefined;
};

export const useSignInOnboardingPage = (): HookState => {
  /**
   * LPのメアド入力時に、local_storageに保存しているはずなので、ここで取得する。
   */
  const userEmail = useMemo(() => {
    if (typeof window == 'undefined') {
      return;
    }
    let email = window.localStorage.getItem('emailForOnboarding');
    return email ?? 'undefined';
  }, []);

  const signInWithPasswordState = useSignInWithPassword({
    redirectPage: '/onboarding/phone',
    presetEmail: userEmail,
  });

  return {
    signInWithPasswordState,
    userEmail,
  };
};
