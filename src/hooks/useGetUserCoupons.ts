import {
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { useFetch } from 'hooks/useFetch';
import React from 'react';
import { getUserCoupons } from 'repositories/getUserCoupons';
import { GetUserCouponsResponse } from 'type/response/getUserCoupons';
import { toUserCoupons } from 'repositories/toViewModel/toUserCoupons';
import { UserCoupons } from 'type/viewModel/common/userCoupons';

type INIT = undefined;
type LOADING = { type: 'loading' };
type LOADED = { type: 'loaded' };
type ERROR = { type: 'error'; message: string };
export type State = INIT | LOADED | ERROR | LOADING;

export type HookState = {
  state: State;
  userCoupons: UserCoupons | undefined;
};

export const useGetUserCoupons = () => {
  const [state, setState] = React.useState<State>(undefined);
  const [userCoupons, setUserCoupons] = React.useState<UserCoupons | undefined>(
    undefined
  );

  const fetcher = React.useCallback(() => {
    return getUserCoupons();
  }, []);

  const { data } = useFetch<GetUserCouponsResponse>(fetcher);

  React.useEffect(() => {
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
      const fetchedData = toUserCoupons(data.data);
      setUserCoupons(fetchedData);
      setState({
        type: 'loaded',
      });
      return;
    }
    setState({
      type: 'error',
      message: '予期しないデータを取得しました',
    });
  }, [data]);

  return { state, userCoupons };
};
