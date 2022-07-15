import { User } from '@firebase/auth-types';

type Init = undefined;

type Loading = { isLoading: true };

type RequestFaild = { isLoading: false; data: undefined; error: Error };

type IsLogin = { isLoading: false; data: User; error: undefined };

type IsLogout = { isLoading: false; data: undefined; error: undefined };

export type AuthState = Init | Loading | RequestFaild | IsLogin | IsLogout;

/**
 * @returns 初期値
 */
export const createInitState = (): Init => {
  return undefined;
};

/**
 * @returns Loading中の状態を表す
 */
export const createLoadingState = (): Loading => {
  return { isLoading: true };
};

/**
 * @returns ユーザーがログイン済みという状態を表す
 */
export const createLoginState = (user: User): IsLogin => {
  return { isLoading: false, data: user, error: undefined };
};

/**
 * @returns ユーザーが非ログインである状態を表す
 */
export const createLogoutState = (): IsLogout => {
  return { isLoading: false, data: undefined, error: undefined };
};

/**
 * @returns リクエストが失敗した状態を表す
 */
export const createRequestFaildState = (error: Error): RequestFaild => {
  return { isLoading: false, data: undefined, error: error };
};

export const isInitState = (authState: AuthState): authState is Init => {
  return authState === undefined;
};

export const isLoadingState = (authState: AuthState): authState is Loading => {
  return !isInitState(authState) && authState.isLoading;
};

export const isLoginState = (authState: AuthState): authState is IsLogin => {
  return (
    !isInitState(authState) &&
    !isLoadingState(authState) &&
    authState.data !== undefined
  );
};

export const isLogoutState = (authState: AuthState): authState is IsLogout => {
  return (
    !isInitState(authState) &&
    !isLoadingState(authState) &&
    authState.data == undefined
  );
};

export const isFailState = (
  authState: AuthState
): authState is RequestFaild => {
  return (
    !isInitState(authState) &&
    !isLoadingState(authState) &&
    authState.error !== undefined
  );
};
