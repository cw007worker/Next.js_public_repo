import { useState, useEffect, useCallback, useMemo } from 'react';
import router from 'next/router';
import { useFirebaseAuthActionUrlParser } from 'hooks/useFirebaseAuthActionUrlParser';
import { auth } from 'libs/firebase';
import firebase from 'firebase';
import {
  firebaseErrorHandler,
  AUTH_ERROR_CODE_MAP,
} from 'type/util/errorHandler/firebase';
import { User as FirebaseUser } from '@firebase/auth-types';
import { useToast } from './useToast';
import { sentryLog } from 'libs/setnry';
import {
  DeepMap,
  FieldError,
  FieldValues,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import {
  FetchManageState,
  createLoadingState,
  createFailState,
  createSuccessState,
  isLoadingState,
  isSuccessState,
  isFailState,
} from 'type/util/fetchData';

type DataState<T> = FetchManageState<T>;

type ResetPasswordFormValues = {
  password: string;
};

export type HookState = {
  register: UseFormRegister<FieldValues>;
  onSubmit: (values: ResetPasswordFormValues) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  canGo: boolean;
  isSubmitting: boolean;
  errors: DeepMap<FieldValues, FieldError>;
};

export const useResetPassword = () => {
  const [state, setState] =
    useState<DataState<{ status: 'success' }>>(undefined);

  const { actionState } = useFirebaseAuthActionUrlParser();

  const setToast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    const { password } = values;
    await request(password);
  };

  const request = useCallback(
    async (password: string) => {
      setState(createLoadingState());
      if (actionState === undefined) {
        setState(
          createFailState(
            '予期せぬエラーが発生しました。数秒経ってから再度お試しください'
          )
        );
        return;
      }
      const actionCode = actionState.actionCode;
      let email;
      try {
        // パスワードリセット処理
        email = await auth().verifyPasswordResetCode(actionCode);
        await auth().confirmPasswordReset(actionCode, password);
      } catch (error) {
        sentryLog(error);
        if (
          (error as firebase.auth.AuthError).code ==
          AUTH_ERROR_CODE_MAP.EXPIRED_ACTION_CODE
        ) {
          setState(
            createFailState(
              'URLの有効期限が切れています。再度パスワードリセットURLを発行する必要があります。'
            )
          );
        } else if (
          (error as firebase.auth.AuthError).code ==
          AUTH_ERROR_CODE_MAP.INVALID_ACTION_CODE
        ) {
          setState(
            createFailState(
              'URLが無効です。お客様のメール受信箱に届いた最新のURLを使用頂くか、再度パスワードリセットURLを発行してください。'
            )
          );
        } else if (
          typeof (error as firebase.auth.AuthError).code !== undefined
        ) {
          const firebaseError = error as firebase.auth.AuthError;
          setState(createFailState(firebaseErrorHandler(firebaseError.code)));
        } else {
          setState(createFailState('予期せぬエラーが発生しました。'));
        }
        return;
      }

      try {
        // ログイン
        await auth().signInWithEmailAndPassword(email, password);
        setState(createSuccessState({ status: 'success' }));
      } catch (error) {
        sentryLog(error);
        if (typeof (error as firebase.auth.AuthError).code !== undefined) {
          const firebaseError = error as firebase.auth.AuthError;
          setState(createFailState(firebaseErrorHandler(firebaseError.code)));
        } else {
          setState(createFailState('予期せぬエラーが発生しました。'));
        }
      }
    },
    [actionState]
  );

  const isSubmitting = useMemo(() => {
    return isLoadingState(state);
  }, [state]);

  useEffect(() => {
    if (isSuccessState(state)) {
      setToast({
        status: 'success',
        title: 'パスワードの再設定に成功しました。',
      });
      router.push('/');
    }
    if (isFailState(state)) {
      setToast({ title: state.error, status: 'error' });
      router.push('/auth/resetPasswordRequest');
    }
  }, [reset, setToast, state]);

  return {
    register,
    onSubmit,
    handleSubmit,
    canGo: isValid,
    isSubmitting,
    errors,
  };
};
