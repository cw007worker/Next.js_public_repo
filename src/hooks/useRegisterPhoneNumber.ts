import { useState, useCallback, useMemo } from 'react';
import { auth } from 'libs/firebase';
import firebase from 'firebase';
import {
  FetchManageState,
  createLoadingState,
  createFailState,
  createSuccessState,
  isLoadingState,
} from 'type/util/fetchData';
import { useRouter } from 'next/router';
import {
  firebaseErrorHandler,
  AUTH_ERROR_CODE_MAP,
} from 'type/util/errorHandler/firebase';
import { User } from '@firebase/auth-types';
import { sentryLog } from 'libs/setnry';
import { isFirebaseAuthError } from 'type/util/firebaseAuth';
import { phoneNumberFormat } from 'utils/phoneNumberFormat';
import { useToast } from '@chakra-ui/react';
import {
  DeepMap,
  FieldError,
  FieldValues,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

type DataState<T> = FetchManageState<T>;

export type HookState = {
  state: DataState<{ phoneNumber: string, confirmationResult: firebase.auth.ConfirmationResult }>;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
  canGo: boolean;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
}

export const useRegisterPhoneNumber = () : HookState => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });
  const [state, setState] =
    useState<DataState<{ 
      phoneNumber: string,
      confirmationResult: firebase.auth.ConfirmationResult
    }>>(undefined);
  const setToast = useToast();

  const setupRecaptcha = useCallback(() => {
    if (window.recaptchaVerifier !== undefined) return;
    try {
      window.recaptchaVerifier = new auth.RecaptchaVerifier(
        'invisible_recapcha',
        {
          size: 'invisible',
        }
      );
    } catch (error) {
      sentryLog(error);
      setToast({ title: '予期せぬエラーが発生しました。', status: 'error' });
    }
  }, [setToast]);

  const request = useCallback(
    async (phoneNumber: string) => {
      setState(createLoadingState());
      setupRecaptcha();
      if (typeof window.recaptchaVerifier === undefined) {
        setState(createFailState('予期せぬエラーが発生しました。'));
        return;
      }

      try {
        const confirmationResult = await auth().signInWithPhoneNumber(
          phoneNumberFormat(phoneNumber),
          window.recaptchaVerifier
        );
        setState(
          createSuccessState({
            phoneNumber: phoneNumber,
            confirmationResult: confirmationResult
          })
        );
      } catch (error) {
        sentryLog(error);
        window.recaptchaVerifier.render().then(function (widgetId) {
          //@ts-ignore
          if (typeof grecaptcha === undefined) {
            setState(createFailState('予期せぬエラーが発生しました。'));
          }
          //@ts-ignore
          grecaptcha.reset(widgetId);
        });
        if (isFirebaseAuthError(error)) {
          setState(createFailState(firebaseErrorHandler(error.code)));
        } else {
          console.error(error);
          setState(createFailState('予期せぬエラーが発生しました。'));
        }
      }
    },
    [setupRecaptcha]
  );

  const onSubmit = useCallback(async () => {
    const phoneNumber = getValues('phoneNumber');
    await request(phoneNumber);
  }, [getValues, request]);

  const isSubmitting = useMemo(() => {
    return isLoadingState(state);
  }, [state]);

  return {
    state,
    handleSubmit,
    register,
    onSubmit,
    isSubmitting,
    canGo: isValid,
    errors,
  };
};
