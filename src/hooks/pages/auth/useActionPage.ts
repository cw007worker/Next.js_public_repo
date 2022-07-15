// Firebase Authのメールリンククリック後のサインイン用
import { useEffect } from 'react';
import router from 'next/router';
import {
  useFirebaseAuthActionUrlParser,
  AUTH_ACTION_CODE,
} from 'hooks/useFirebaseAuthActionUrlParser';
import { useEmailLinkCertification } from 'hooks/useEmailLinkCertification';
import { useResetPassword } from 'hooks/useResetPassword';

export const useActionPage = () => {
  const { actionState } = useFirebaseAuthActionUrlParser();
  const emailLinkCertificationState = useEmailLinkCertification();
  const resetPasswordState = useResetPassword();

  useEffect(() => {
    const f = async () => {
      if (emailLinkCertificationState.alreadyRegsiter) {
        await emailLinkCertificationState.signInWithEmailLink();
      } else {
        await emailLinkCertificationState.signUpWithEmailLink();
      }
    };

    if (actionState == undefined) return;
    if (actionState.mode !== AUTH_ACTION_CODE.SIGN_IN) return;
    if (emailLinkCertificationState.canReqest) {
      f();
    } else {
      return;
    }
  }, [emailLinkCertificationState.canReqest, actionState]);

  useEffect(() => {
    if (emailLinkCertificationState.processState == undefined) return;
    if (emailLinkCertificationState.processState.type == 'success') {
      router.push('/comingsoon/mypage');
    }
  }, [emailLinkCertificationState.processState]);

  return {
    actionState,
    emailLinkCertificationState,
    resetPasswordState,
  };
};
