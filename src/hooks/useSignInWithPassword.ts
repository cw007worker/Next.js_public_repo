import { useState, useEffect, useCallback, useMemo } from 'react';
import router from 'next/router';
import { auth } from 'libs/firebase';
import firebase from 'firebase';
import { useToast } from './useToast';
import {
  FetchManageState,
  createLoadingState,
  createFailState,
  createSuccessState,
  isLoadingState,
  isSuccessState,
  isFailState,
} from 'type/util/fetchData';
import {
  DeepMap,
  FieldError,
  FieldValues,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { firebaseErrorHandler } from 'type/util/errorHandler/firebase';
import { useUpdateUserContext } from 'context/userContext';

type DataState<T> = FetchManageState<T>;

type SignInWithPasswordFormValues = {
  email: string;
  password: string;
  holdAuthPersistance: boolean;
};

export type HookState = {
  onSubmit: (values: SignInWithPasswordFormValues) => Promise<void>;
  isSubmitting: boolean;
  canGo: boolean;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<FieldValues>;
};

type Props = {
  redirectPage: string; // signIn完了後にリダイレクトする遷移先
  presetEmail?: string;
};

export const useSignInWithPassword = (props: Props) => {
  const [state, setState] =
    useState<DataState<{ status: 'success' }>>(undefined);

  const setToast = useToast();

  const refetchUser = useUpdateUserContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (values: SignInWithPasswordFormValues) => {
    const { password, email, holdAuthPersistance } = values;
    await request(email, password, holdAuthPersistance);
  };

  const request = useCallback(
    async (email: string, password: string, holdAuthPersistance: boolean) => {
      const _email = email ?? props.presetEmail;
      setState(createLoadingState());
      try {
        let authPersistance;
        if (holdAuthPersistance) {
          // 明示的なログアウトをしない限り、認証状態を保持し続ける
          authPersistance = auth.Auth.Persistence.LOCAL;
        } else {
          // タブやウィンドウを閉じるとクリアすると認証状態がリセットされる
          authPersistance = auth.Auth.Persistence.SESSION;
        }
        await auth().setPersistence(authPersistance);
        await auth().signInWithEmailAndPassword(_email, password);
        setState(createSuccessState({ status: 'success' }));
      } catch (error) {
        if (typeof (error as firebase.auth.AuthError).code !== undefined) {
          const firebaseError = error as firebase.auth.AuthError;
          setState(createFailState(firebaseErrorHandler(firebaseError.code)));
        } else {
          console.error(error);
          setState(createFailState('予期せぬエラーが発生しました。'));
        }
      }
    },
    [props.presetEmail]
  );

  const isSubmitting = useMemo(() => {
    return isLoadingState(state);
  }, [state]);

  useEffect(() => {
    if (isSuccessState(state)) {
      refetchUser();
      router.push(props.redirectPage);
    }
    if (isFailState(state)) {
      setToast({ title: state.error, status: 'error' });
    }
  }, [props.redirectPage, refetchUser, reset, setToast, state]);

  return {
    register,
    canGo: isValid,
    isSubmitting,
    onSubmit,
    handleSubmit,
    errors,
  };
};
