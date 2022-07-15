import { useEffect } from 'react';
import {
  useSignInWithPassword,
  HookState as SignInWithPasswordState,
} from 'hooks/useSignInWithPassword';
import { useUserContext } from 'context/userContext';
import router from 'next/router';

export type HookState = {
  signInWithPasswordState: SignInWithPasswordState;
};

// SignIn方法が多様化した時のために、pageのhookとsignIn処理のhooksは分けておく
export const useSignInPage = (): HookState => {
  const signInWithPasswordState = useSignInWithPassword({
    redirectPage: '/',
  }); //FIXME：これ下のuseEffect内のrouter.pushとuseSignInWithPasswordのredirectで2回同じ処理が書かれている気がする。
  const user = useUserContext();

  useEffect(() => {
    // @ts-ignore TODO: 型エラー起きずに、getMeの結果を取得できるように修正する
    if (user !== undefined && user.type === 'loaded') {
      router.push('/');
    }
  }, [user]);

  return {
    signInWithPasswordState,
  };
};
