import { auth } from 'libs/firebase';
import { useEffect, useState } from 'react';
import { User, Error } from '@firebase/auth-types';
import {
  AuthState,
  createLoadingState,
  createLoginState,
  createLogoutState,
  createRequestFaildState,
} from 'type/util/fetchFirebaseUser';
import { sentryLog } from 'libs/setnry';
/**
 * firebase authのユーザーを取得するためのHooks
 * - auth().crrentUser等は使用せず、Auth Observerを初期化して、userを取得する
 */
export const useFetchFirebaseUser = () => {
  const [authState, setAuthState] = useState<AuthState>(undefined);

  const initializeAuth = (): Promise<User | null> => {
    return new Promise((resolve) => {
      const unsubscribe = auth().onAuthStateChanged((user) => {
        resolve(user);
        // 登録解除
        unsubscribe();
      });
    });
  };

  useEffect(() => {
    setAuthState(createLoadingState());

    const fetchFirebaseAuth = async () => {
      let user: User | null;
      try {
        user = await initializeAuth();
        // @ts-ignore TODO: 直します
      } catch (error: Error) {
        sentryLog(error);
        return setAuthState(createRequestFaildState(error));
      }
      if (user) {
        return setAuthState(createLoginState(user));
      } else {
        return setAuthState(createLogoutState());
      }
    };

    fetchFirebaseAuth();
  }, []);

  return { authState };
};
