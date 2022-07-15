import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from 'libs/firebase';
import {
  isFailState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { useToast } from 'hooks/useToast';
import firebase from 'firebase';
import { useRegisterPhoneNumber, HookState as RegisterNumberHookState } from 'hooks/useRegisterPhoneNumber';
import { useDisclosure } from '@chakra-ui/react';
import { useVerifyPhoneCode, HookState as VerifyCodeHookState } from 'hooks/useVerifyPhoneCode';

export type HookState = {
  registerNumber: RegisterNumberHookState;
  verifyCode: VerifyCodeHookState;
  isOpenVerifyCodeModal: boolean;
  onCloseVerifyCodeModal: () => void;
  phoneNumber: string | undefined;
};

declare global {
  interface Window {
    recaptchaVerifier: firebase.auth.RecaptchaVerifier;
    confirmationResult: firebase.auth.ConfirmationResult;
  }
}

export const usePhonePage = (): HookState => {
  const setToast = useToast();
  const router = useRouter();
  const registerNumber = useRegisterPhoneNumber();

  const confirmationResult = useMemo(() => {
    if (isSuccessState(registerNumber.state) && registerNumber.state.data.confirmationResult !== undefined) {
      return registerNumber.state.data.confirmationResult;
    } else {
      return undefined;
    }
  }, [registerNumber.state])
  const verifyCode = useVerifyPhoneCode(confirmationResult);
  const {
    isOpen: isOpenVerifyCodeModal,
    onClose: onCloseVerifyCodeModal,
    onOpen: onOpenVerifyCodeModal,
  } = useDisclosure();

  const phoneNumber =  useMemo(() => {
    if (isSuccessState(registerNumber.state) && registerNumber.state.data.confirmationResult !== undefined) {
      return registerNumber.state.data.phoneNumber;
    } else {
      return undefined;
    }
  }, [registerNumber.state])

  /**
   * phoneNumberの登録が完了したら、確認コード入力モーダルを開く
   */
  useEffect(() => {
    if (isSuccessState(registerNumber.state) && registerNumber.state.data.confirmationResult !== undefined) {
      onOpenVerifyCodeModal();
    }
    if (isFailState(registerNumber.state) && registerNumber.state.error !== '') {
      setToast({ title: registerNumber.state.error, status: 'error' });
    }
  }, [setToast, registerNumber.state]);

  /**
   * 確認コード処理完了後にonboardingの次のステップへ遷移
   */
  useEffect(() => {
    if (isSuccessState(verifyCode.state) && verifyCode.state.data.status === 'success') {
      router.push('/onboarding/plan');
    }
    if (isFailState(verifyCode.state) && verifyCode.state.error !== '') {
      setToast({ title: verifyCode.state.error, status: 'error' });
    }
  }, [router, setToast, verifyCode.state]);

  return {
    registerNumber,
    verifyCode,
    isOpenVerifyCodeModal,
    onCloseVerifyCodeModal,
    phoneNumber,
  };
};
