import { useCallback, useEffect, useState } from 'react';
import {
  isSuccessState,
  isLoadingState,
  isInitState,
  createLoadingState,
  createFailState,
  createSuccessState,
} from 'type/util/fetchData';
import { Me } from 'type/viewModel/me';
import { getMe } from 'repositories/getMe';
import { toMe } from 'repositories/toViewModel/toMe';
import { FetchManageState } from 'type/util/fetchData';
import { sentrySetUser } from 'libs/setnry';

export type State = FetchManageState<Me>;

export const useGetMe = () => {
  const [state, setState] = useState<State>(undefined);

  const fetch = useCallback(() => {
    setState(createLoadingState());
    getMe()
      .then((res) => {
        setState(createSuccessState(toMe(res)));
      })
      .catch((error) => {
        if (error instanceof Error) {
          setState(createFailState(error.message));
        } else {
          setState(createFailState('予期せぬエラーが発生しました。'));
        }
      });
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    if (isSuccessState(state)) {
      // sentry の user設定
      sentrySetUser({
        id: String(state.data.id),
        email: state.data.email,
        firstName: state.data.firstName,
        lastName: state.data.lastName,
        hasPassword: state.data.lastName,
        phoneNumber: state.data.phoneNumber,
        isMembership: state.data.isMembership,
        cartItemCount: state.data.cartItemCount,
        willCancelMembership: state.data.willCancelMembership,
        canceledMembership: state.data.canceledMembership,
      });
    }
  }, [state]);

  const refetch = useCallback(() => {
    fetch();
  }, [fetch]);

  return {
    state,
    refetch,
  };
};
