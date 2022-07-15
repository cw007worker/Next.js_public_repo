/** 初期状態を表現する型 */
type Init = undefined;

/** データの取得中を表現する型 */
type Loading = { isLoading: true };

/** データの取得を表現する型 */
type Success<T> = { isLoading: false; data: T; error: undefined };

/** データの取得に失敗を表現する型 */
type Fail = { isLoading: false; data: undefined; error: string };

/** データの取得状態を表現する型 */
export type FetchManageState<T> = Init | Loading | Success<T> | Fail;

/**
 * Init型を作る
 * @returns Init型を表現するオブジェクト
 */
export const createInitState = (): Init => {
  return undefined;
};

/**
 * Loading型を作る
 * @returns Loading型を表現するオブジェクト
 */
export const createLoadingState = (): Loading => {
  return { isLoading: true };
};

/**
 * Success型を作る
 * @param data データ
 * @returns 成功型を表現するオブジェクト
 */
export const createSuccessState = <T>(data: T): Success<T> => {
  return { isLoading: false, data, error: undefined };
};

/**
 * Fail型を作る
 * @param message エラーメッセージ
 * @returns Fail型を表現するオブジェクト
 */
export const createFailState = (message: string): Fail => {
  return { isLoading: false, data: undefined, error: message };
};

export const isInitState = <T>(data: FetchManageState<T>): data is Init => {
  return data === undefined;
};

export const isLoadingState = <T>(
  data: FetchManageState<T>
): data is Loading => {
  return !isInitState(data) && data.isLoading;
};

export const isSuccessState = <T>(
  data: FetchManageState<T>
): data is Success<T> => {
  return !isInitState(data) && !isLoadingState(data) && data.data !== undefined;
};

export const isFailState = <T>(data: FetchManageState<T>): data is Fail => {
  return (
    !isInitState(data) && !isLoadingState(data) && data.error !== undefined
  );
};
