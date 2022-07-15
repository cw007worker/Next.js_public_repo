import { useMemo } from 'react';
import {
  useRegisterWithPassword,
  HookState as RegisterWithPasswordHookState,
} from 'hooks/useRegisterWithPassword';
import {
  useRegisterWithPasswordAndEmail,
  HookState as RegisterWithPasswordAndEmailHookState,
} from 'hooks/useRegisterWithPasswordAndEmail';
import { useUserContext } from 'context/userContext';
import { useOnboardingRoutingHandler } from './useOnboardingRoutingHandler';
import { isSuccessState } from 'type/util/fetchData';
import { useFirebaseUser } from 'hooks/useFirebaseUser';

export type HookState = {
  isPreRegisteredUser: boolean;
  registerWithPasswordState: RegisterWithPasswordHookState;
  registerWithPasswordAndEmailState: RegisterWithPasswordAndEmailHookState;
};

export const useRegisterPage = (): HookState => {
  const firebaseUser = useFirebaseUser();
  const user = useUserContext();
  const registerWithPasswordState = useRegisterWithPassword();
  const registerWithPasswordAndEmailState = useRegisterWithPasswordAndEmail();

  const isPreRegisteredUser = useMemo(() => {
    return firebaseUser !== (null || undefined);
  }, [firebaseUser]);

  return {
    isPreRegisteredUser,
    registerWithPasswordState,
    registerWithPasswordAndEmailState,
  };
};
