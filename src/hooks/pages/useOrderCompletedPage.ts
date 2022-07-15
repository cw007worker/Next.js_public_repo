import React from 'react';
import { useFetch } from 'hooks/useFetch';
import { getOrderCompletedInfo } from 'repositories/getOrderCompletedInfo';
import { toOrderCompletedInfo } from 'repositories/toViewModel/toOrderCompletedInfo';
import { GetOrderCompletedInfoResponse } from 'type/response/getOrderCompletedInfo';
import { OrderCompletedInfo } from 'type/viewModel/orderCompletedInfo';
import {
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';

type INIT = undefined;
type LOADING = { type: 'loading' };
type LOADED = { type: 'loaded' };
type ERROR = { type: 'error'; message: string };
type PageState = INIT | LOADED | ERROR | LOADING;

export type HookState = {
  orderCompletedInfo: OrderCompletedInfo | undefined;
  pageState: PageState;
};

export const useOrderCompletedPage = (): HookState => {
  const [pageState, setPageState] = React.useState<PageState>(undefined);
  const [orderCompletedInfo, setOrderCompletedInfo] = React.useState<OrderCompletedInfo | undefined>(undefined);
  const [shouldFetch, setShouldFetch] = React.useState(true);
  const fetcher = React.useCallback(() => { return getOrderCompletedInfo(); }, []);
  const { data } = useFetch<GetOrderCompletedInfoResponse>(fetcher, shouldFetch);
  
  React.useEffect(() => {
    if (isInitState(data)) {
      return setPageState(undefined);
    }
    if (isLoadingState(data)) {
      return setPageState({
        type: 'loading',
      });
    }
    if (isFailState(data)) {
      return setPageState({
        type: 'error',
        message: data.error,
      });
    }
    if (isSuccessState(data)) {
      const orderCompletedInfo = toOrderCompletedInfo(data.data);
      setOrderCompletedInfo(orderCompletedInfo);
      setShouldFetch(false);
      return setPageState({
        type: 'loaded',
      });
    }
    setPageState({
      type: 'error',
      message: '予期しないデータを取得しました',
    });
  }, [data]);

  return {
    orderCompletedInfo,
    pageState,
  };
};
