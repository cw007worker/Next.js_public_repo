import { useEffect, useState } from 'react';
import { getParameterByName } from 'utils/getPrameterByName';

export const AUTH_ACTION_CODE = {
  SIGN_IN: 'signIn',
  RESET_PASSWORD: 'resetPassword',
};

export const useFirebaseAuthActionUrlParser = () => {
  const [actionState, setActionState] = useState<
    | {
        mode: string;
        actionCode:
          | typeof AUTH_ACTION_CODE.SIGN_IN
          | typeof AUTH_ACTION_CODE.RESET_PASSWORD;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    const mode = getParameterByName('mode');
    const actionCode = getParameterByName('oobCode');
    if (!mode || !actionCode) return;
    setActionState({
      mode,
      actionCode,
    });
  }, []);

  return {
    actionState,
  };
};
