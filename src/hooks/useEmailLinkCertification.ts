// Firebase Authのメールリンククリック後のサインイン用
import { useEffect, useState, useMemo, useCallback } from 'react';
import { auth } from 'libs/firebase/index';
import HttpClient from 'inflastructure/HttpClient';
import UserApi from 'repositories/pre-launch/UserApi';
import { getParameterByName } from 'utils/getPrameterByName';
import { sentryLog } from 'libs/setnry';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});
const userApi = new UserApi({ httpClient });

type INIT = undefined;

type LOADING = { type: 'loading' };

type LOADED = { type: 'success' };

type ERROR = { type: 'error' };

type State = INIT | LOADED | ERROR | LOADING;

export type HookState = {
  processState: State;
  canReqest: boolean;
  alreadyRegsiter: boolean | undefined;
  signInWithEmailLink: () => void;
  signUpWithEmailLink: () => void;
};

export const useEmailLinkCertification = (): HookState => {
  // Email Link ログインのプロセス全体の成功可否をObserveするstate
  // 本当は、エラー処理を厳密にハンドリングしたいが、ここで失敗するユーザーの殆どが、
  // 期限切れURLのクリックによるエラーなので、一旦これで良しとする
  const [processState, setProcessState] = useState<State>(undefined);
  const [params, setParams] = useState<
    | {
        email: string;
        inviteToken: string | null;
      }
    | undefined
  >(undefined);

  const [alreadyRegsiter, setAlreadyRegister] = useState<boolean | undefined>(
    undefined
  );

  const signIn = useCallback(async () => {
    if (params == undefined) {
      setProcessState({ type: 'error' });
      return;
    }

    let email = params.email;
    try {
      await auth().setPersistence(auth.Auth.Persistence.LOCAL);
      await auth().signInWithEmailLink(email, window.location.href);
      window.localStorage.setItem('signStatus', 'signIn'); // myapgeで使用する
      setProcessState({ type: 'success' });
      return;
    } catch (error) {
      setProcessState({ type: 'error' });
    }
  }, [params]);

  const signUp = useCallback(async () => {
    if (params == undefined) {
      setProcessState({ type: 'error' });
      return;
    }

    let email = params.email;
    try {
      // Firebase Authにおいてメールリンク認証は、SignInとSignUpを区別しない
      await auth().setPersistence(auth.Auth.Persistence.LOCAL);
      await auth().signInWithEmailLink(email, window.location.href);
    } catch (error) {
      sentryLog(error);
      setProcessState({ type: 'error' });
      return;
    }

    let inviteToken = params.inviteToken;
    try {
      await userApi.postUser({ invite_token: inviteToken });
      window.localStorage.setItem('signStatus', 'signUp'); // myapgeで使用する
      setProcessState({ type: 'success' });
      return;
    } catch (error) {
      sentryLog(error);
      setProcessState({ type: 'error' });
    }
  }, [params]);

  const canReqest = useMemo(() => {
    if (alreadyRegsiter !== undefined) {
      return true;
    } else {
      return false;
    }
  }, [alreadyRegsiter]);

  useEffect(() => {
    const f = async () => {
      if (params == undefined) {
        return;
      }

      let result;
      try {
        result = await auth().fetchSignInMethodsForEmail(params.email);
      } catch (error) {
        sentryLog(error);
        setProcessState({ type: 'error' });
        return;
      }

      if (0 < result.length) {
        setAlreadyRegister(true);
      } else {
        setAlreadyRegister(false);
      }
    };
    f();
  }, [params]);

  useEffect(() => {
    setProcessState({ type: 'loading' });
    // HACK: SignInLinkのパラメータからemailと, invite tokenを取得する
    // sesion fixactionが起きるリスクがあるため、本来は、local_storageから取得するべきだが、フェーズ的な観点を考えて致し方なしと判断
    const email = getParameterByName('email');
    const inviteToken = getParameterByName('invite_token');

    if (!email) {
      setProcessState({ type: 'error' });
      return;
    }
    setParams({ email, inviteToken });
  }, []);

  return {
    processState,
    canReqest,
    alreadyRegsiter,
    signInWithEmailLink: signIn,
    signUpWithEmailLink: signUp,
  };
};
