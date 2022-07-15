import { useState, useEffect, useCallback, useMemo } from 'react';
import { auth } from 'libs/firebase';
import firebase from 'firebase';
import {
  firebaseErrorHandler,
  AUTH_ERROR_CODE_MAP,
} from 'type/util/errorHandler/firebase';
import { useGenerateSignInLink } from 'hooks/useGenerateSignInLink';
import { User as FirebaseUser } from '@firebase/auth-types';
import {
  FetchManageState,
  createLoadingState,
  createFailState,
  createSuccessState,
  isLoadingState,
  isSuccessState,
  isFailState,
} from 'type/util/fetchData';
import { useUserContext } from 'context/userContext';
import {
  DeepMap,
  FieldError,
  FieldValues,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import router from 'next/router';
import { useToast } from './useToast';
import { sentryLog } from 'libs/setnry';

type DataState<T> = FetchManageState<T>;

type RegisterFromValues = {
  password: string;
};

export type HookState = {
  onSubmit: (values: RegisterFromValues) => Promise<void>;
  isSubmitting: boolean;
  userEmail: string | undefined;
  canGo: boolean;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<FieldValues>;
};

export const useRegisterWithPassword = () => {
  const { request: generageSignInLinkRequest } = useGenerateSignInLink();
  const [state, setState] =
    useState<DataState<{ status: 'success' }>>(undefined);
  const setToast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const user = useUserContext();

  const userEmail = useMemo(() => {
    return isSuccessState(user) ? user.data.email : undefined;
  }, [user]);

  const onSubmit = async (values: RegisterFromValues) => {
    const { password } = values;
    await request(password);
  };

  const isSubmitting = useMemo(() => {
    return isLoadingState(state);
  }, [state]);

  /**
   * パスワード登録が、再認証が必要で失敗した用の処理
   */
  const retryPasswordRegister = useCallback(
    async (user: FirebaseUser, password: string) => {
      const email = user.email;
      if (!email) {
        throw new Error('Emailが取得できませんでした');
      }

      // Email Linkの取得
      let emailLink;
      try {
        const res = await generageSignInLinkRequest(email);
        emailLink = res.emailLink;
      } catch (error) {
        throw new Error('EmailLinkの取得に失敗しました。');
      }

      // 再認証処理
      try {
        const credential = await auth.EmailAuthProvider.credentialWithLink(
          email,
          emailLink
        );
        await user.reauthenticateWithCredential(credential);
      } catch (error) {
        sentryLog(error);
        throw new Error('再認証に失敗しました');
      }

      try {
        await user.updatePassword(password);
      } catch (error) {
        sentryLog(error);
        if (typeof (error as firebase.auth.AuthError).code !== undefined) {
          const firebaseError = error as firebase.auth.AuthError;
          throw new Error('パスワード登録のリトライに失敗しました。');
        } else {
          throw new Error('パスワード登録のリトライに失敗しました。');
        }
      }
    },
    []
  );

  /**
   * パスワード登録処理
   */
  const request = useCallback(async (password: string) => {
    setState(createLoadingState());
    let user: FirebaseUser | null;
    try {
      user = auth().currentUser;
    } catch (error) {
      sentryLog(error);
      setState(createFailState('パスワードの設定に失敗しました'));
      return;
    }
    if (!user) {
      setState(createFailState('パスワードの設定に失敗しました'));
      return;
    }

    try {
      await user.updatePassword(password);
      setState(
        createSuccessState<{ status: 'success' }>({
          status: 'success',
        })
      );
    } catch (error) {
      if (
        (error as firebase.auth.AuthError).code ==
        (AUTH_ERROR_CODE_MAP.REQUIRES_RECENT_LOGIN ||
          AUTH_ERROR_CODE_MAP.INVALID_USER_TOKEN)
      ) {
        // Firebaseの再認証を行って、パスワード登録処理をリトライする
        if (!user) {
          sentryLog(error);
          setState(createFailState('パスワードの設定に失敗しました'));
          return;
        }
        try {
          await retryPasswordRegister(user, password);
          setState(
            createSuccessState<{ status: 'success' }>({
              status: 'success',
            })
          );
        } catch {
          sentryLog(error);
          setState(createFailState('パスワードの設定に失敗しました'));
          return;
        }
      } else if (typeof (error as firebase.auth.AuthError).code !== undefined) {
        const firebaseError = error as firebase.auth.AuthError;
        setState(createFailState(firebaseErrorHandler(firebaseError.code)));
      } else {
        sentryLog(error);
        setState(createFailState('パスワードの設定に失敗しました'));
        return;
      }
    }
  }, []);

  useEffect(() => {
    if (isSuccessState(state)) {
      router.push('/onboarding/phone');
    }
    if (isFailState(state)) {
      setToast({ title: state.error, status: 'error' });
    }
  }, [reset, setToast, state]);

  return {
    request,
    state,
    register,
    canGo: isValid,
    isSubmitting,
    onSubmit,
    handleSubmit,
    userEmail,
    errors,
  };
};
