import { useCallback, useEffect, useState } from 'react';
import { getProductsForPersonalize } from 'repositories/getProductsForPersonalize';

import { useFetch } from './useFetch';
import { GetProductsForPersonalizeResponse } from 'type/response/getProductsForPersonalize';
import {
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { ProductsForPersonalize } from 'type/viewModel/productsForPersonalize';
import { toProductsForPersonalize } from 'repositories/toViewModel/toProductsForPersonalize';

type INIT = undefined;

type LOADING = { type: 'loading' };

type LOADED = {
  type: 'loaded';
  data: ProductsForPersonalize;
};

type ERROR = {
  type: 'error';
  message: string;
};

export type State = INIT | LOADED | ERROR | LOADING;

export type HookState = State;

export const useGetProductsForPersonalize = (): HookState => {
  const [state, setState] = useState<State>(undefined);
  const fetcher = useCallback(() => {
    return getProductsForPersonalize();
  }, []);

  const { data } = useFetch<GetProductsForPersonalizeResponse>(fetcher);

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
      return setState({
        type: 'loaded',
        data: toProductsForPersonalize(data.data),
      });
    }
    setState({
      type: 'error',
      message: '予期しないデータを取得しました。',
    });
  }, [data]);

  return state;
};
