import { useState, useEffect, useCallback, useMemo } from 'react';
import router from 'next/router';
import { sendResetPasswordLinkToEmail } from 'repositories/sendResetPasswordLinkToEmail';
import { useToast } from './useToast';
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

type ResetPasswordRequestFormValues = {
  email: string;
};

export type HookState = {
  email: string | undefined;
  register: UseFormRegister<FieldValues>;
  onSubmit: (values: ResetPasswordRequestFormValues) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  canGo: boolean;
  isSubmitting: boolean;
  isSuccess: boolean;
  errors: DeepMap<FieldValues, FieldError>;
};

export const useResetPasswordRequest = () => {
  const [state, setState] =
    useState<DataState<{ status: 'success' }>>(undefined);

  const [email, setEmail] = useState<string | undefined>(undefined);

  const setToast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (values: ResetPasswordRequestFormValues) => {
    const { email } = values;
    await request(email);
  };

  const request = useCallback(async (email: string) => {
    setState(createLoadingState());
    try {
      await sendResetPasswordLinkToEmail({ email: email });
      setEmail(email); // UI表示用
      setState(createSuccessState({ status: 'success' }));
    } catch (error) {
      console.error(error);
      setState(createFailState('予期せぬエラーが発生しました。'));
    }
  }, []);

  const isSubmitting = useMemo(() => {
    return isLoadingState(state);
  }, [state]);

  const isSuccess = useMemo(() => {
    return isSuccessState(state);
  }, [state]);

  useEffect(() => {
    if (isFailState(state)) {
      setToast({ title: state.error, status: 'error' });
    }
  }, [reset, setToast, state]);

  return {
    email,
    register,
    onSubmit,
    handleSubmit,
    canGo: isValid,
    isSubmitting,
    isSuccess,
    errors,
  };
};
