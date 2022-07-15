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
import {
  Control,
  DeepMap,
  FieldError,
  FieldValues,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

type DataState<T> = FetchManageState<T>;

export type HookState = {
  state: DataState<{ status: 'success' }>;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
  canGo: boolean;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
}

export const useVerifyPhoneCode = (
  confirmationResult: firebase.auth.ConfirmationResult | undefined
): HookState => {
  const [state, setState] =
    useState<DataState<{ status: 'success' }>>(undefined);
  const router = useRouter();
  const {
    getValues,
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const request = useCallback(
    async (verificationCode: string) => {
      setState(createLoadingState());
      // confirmationResultのcheck
      if (confirmationResult === undefined) {
        console.error('phoneVerificationIdが取得できませんでした。');
        return setState(createFailState('認証コードの確認に失敗しました。'));
      }
  
      // user のcheck
      let user = auth().currentUser;
      if (user === null) {
        console.error('Userを取得できませんでした。');
        return setState(createFailState('認証コードの確認に失敗しました。'));
      }
      
      /**
       * 確認コードの検証
       * 本来は、confirmationResult.confirm(code) でも問題ないが、オンボの前のステップで
       * メアドによってユーザーが新規作成されており、そのユーザーと電話番号登録したユーザーを
       * 紐付けする必要があるため、credentialを使用した検証を行なっている。
       */
      let phoneVerificationId = confirmationResult.verificationId;
      let credential: firebase.auth.AuthCredential;
      if (phoneVerificationId) {
        try {
          credential = await auth.PhoneAuthProvider.credential(
            phoneVerificationId,
            verificationCode
          );
        } catch (err) {
          console.error(err);
          sentryLog(err);
          return setState(createFailState('認証コードの確認に失敗しました。'));
        }
      } else {
        console.error('予期せぬエラーを検知しました。');
        return setState(createFailState('認証コードの確認に失敗しました。'));
      }

      /**
       * 電話番号を既存のfirebase userに紐付けする
       * FYI：https://firebase.google.com/docs/reference/js/v8/firebase.User#linkandretrievedatawithcredential
       */
      try {
        await user.linkAndRetrieveDataWithCredential(credential);
        setState(createSuccessState({ status: 'success' }));
      } catch (error) {
        sentryLog(error);
        if (isFirebaseAuthError(error)) {
          console.error(`firebase error: `, error);
          if (error.code === AUTH_ERROR_CODE_MAP.PROVIDE_ALREADY_LINKED) {
            //すでに登録が完了しているのでpaymentに飛ばす。
            setState(createSuccessState({ status: 'success' }));
            return;
          }
          setState(createFailState(firebaseErrorHandler(error.code)));
        } else {
          console.error(error);
          setState(createFailState('予期せぬエラーが発生しました。'));
        }
      }
    },
    [router, confirmationResult]
  );

  const onSubmit = useCallback(async () => {
    const verificationCode = getValues('verificationCode');
    await request(verificationCode);
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
    control,
  };
};
