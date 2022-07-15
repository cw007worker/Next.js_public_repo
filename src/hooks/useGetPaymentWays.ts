import { useCallback, useEffect, useState } from 'react';
import {
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { useFetch } from './useFetch';
import { PaymentWays } from 'type/viewModel/paymentWays';
import { toPaymentWays } from 'repositories/toViewModel/toPaymentWays';
import { GetPaymentWaysResponse } from 'type/response/getPaymentWays';
import { getPaymentWays } from 'repositories/getPaymentWays';

type INIT = undefined;
type LOADING = { type: 'loading' };
type LOADED = {
  type: 'loaded';
  data: PaymentWays;
};
type ERROR = { type: 'error'; message: string };
type State = INIT | LOADED | ERROR | LOADING;

export type HookState = {
  state: State;
};

export const useGetPaymentWays = () => {
  const [state, setState] = useState<State>(undefined);

  const fetcher = useCallback(() => {
    return getPaymentWays();
  }, []);

  const { data } = useFetch<GetPaymentWaysResponse>(fetcher);

  useEffect(() => {
    if (isInitState(data)) {
      return setState(undefined);
    }
    if (isLoadingState(data)) {
      return setState({
        type: 'loading',
      });
    }
    if (isFailState(data)) {
      return setState({
        type: 'error',
        message: data.error,
      });
    }
    if (isSuccessState(data)) {
      const fetchedData = toPaymentWays(data.data);
      setState({
        type: 'loaded',
        data: fetchedData,
      });
      return;
    }
    setState({
      type: 'error',
      message: '予期しないデータを取得しました',
    });
  }, [data]);

  return {
    state,
  };
};
