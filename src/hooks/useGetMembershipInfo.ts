import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useFetch } from 'hooks/useFetch';
import { getMembershipInfo } from 'repositories/getMembershipInfo';
import { GetMembershipInfoResponse } from 'type/response/getMembershipInfo';
import {
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { toMembershipInfo } from 'repositories/toViewModel/toMembershipInfo';
import { MembershipInfo } from 'type/viewModel/membershipInfo';

type INIT = undefined;

type LOADING = { type: 'loading' };

export type LOADED = {
  type: 'loaded';
  data: MembershipInfo;
};

type ERROR = { type: 'error'; message: string };

type State = INIT | LOADED | ERROR | LOADING;

export type HookState = {
  state: State;
};

export const useGetMembershipInfo = (): HookState => {
  const [state, setState] = useState<State>(undefined);
  const fetcher = React.useCallback(() => {
    return getMembershipInfo();
  }, []);

  const { data } = useFetch<GetMembershipInfoResponse>(fetcher);

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
      return setState({
        type: 'loaded',
        data: toMembershipInfo(data.data),
      });
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
