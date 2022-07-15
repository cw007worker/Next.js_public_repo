import { useState, useCallback, useMemo, useEffect } from 'react';
import { auth } from 'libs/firebase';
import firebase from 'firebase';
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
import router from 'next/router';
import { useToast } from './useToast';
import { addUser } from 'repositories/addUser';
import { sentryLog } from 'libs/setnry';
import { isFirebaseAuthError } from 'type/util/firebaseAuth';

type DataState<T> = FetchManageState<T>;

type RegisterFromValues = {
  password: string;
  email: string;
};

export type HookState = {
  onSubmit: (values: RegisterFromValues) => Promise<void>;
  isSubmitting: boolean;
  canGo: boolean;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<FieldValues>;
};

export const useRegisterWithPasswordAndEmail = () => {
  const [state, setState] =
    useState<DataState<{ status: 'success' }>>(undefined);

  const setToast = useToast();

  const userEmail = useMemo(() => {
    if (typeof window == 'undefined') {
      return;
    }
    let email = window.localStorage.getItem('emailForOnboarding');
    return email;
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: userEmail ?? '',
    } as FieldValues,
  });

  const onSubmit = async (values: RegisterFromValues) => {
    const { password, email } = values;
    await request(email, password);
  };

  const isSubmitting = useMemo(() => {
    return isLoadingState(state);
  }, [state]);

  const request = useCallback(async (email: string, password: string) => {
    setState(createLoadingState());
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      await addUser();
      setState(createSuccessState({ status: 'success' }));
    } catch (error) {
      sentryLog(error);
      if (isFirebaseAuthError(error)) {
        setState(createFailState(firebaseErrorHandler(error.code)));
      } else {
        console.error(error);
        setState(createFailState('予期せぬエラーが発生しました。'));
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
    errors,
  };
};
