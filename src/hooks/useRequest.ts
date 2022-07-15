import { sentryLog } from 'libs/setnry';
import { useState } from 'react';
import {
  createFailState,
  createLoadingState,
  createSuccessState,
  FetchManageState,
} from 'type/util/fetchData';

type DataState<T> = FetchManageState<T>;

/**
 * @param {function} useFetchとは違い任意のタイミングで実行できる
 * @returns fail, success, loadingのいづれかの状態を持ったstate
 */
export const useRequest = <T>(fetcher: (...args: any) => Promise<T>) => {
  const [data, setData] = useState<DataState<T>>(undefined);

  const request = async (...args: any) => {
    setData(createLoadingState());
    try {
      const res = await fetcher(...args);
      setData(createSuccessState(res));
    } catch (error) {
      console.error(error);
      sentryLog(error);
      setData(createFailState('データの取得に失敗しました。'));
    }
  };
  return {
    data,
    request,
  };
};
