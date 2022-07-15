import { useCallback, useEffect, useState } from 'react';
import {
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { toMembershipPlans } from 'repositories/toViewModel/toMembershipPlans';
import { FetchManageState } from 'type/util/fetchData';
import { getMembershipPlans } from 'repositories/getMembershipPlans';
import { MembershipPlans } from 'type/viewModel/membershipPlans';
import { useFetch } from './useFetch';
import { GetMembershipPlansResponse } from 'type/response/getMembershipPlans';
import { MembershipPlan } from 'type/response/partial/membershipPlan';

type INIT = undefined;
type LOADING = { type: 'loading' };
type LOADED = {
  type: 'loaded';
  data: MembershipPlans;
};
type ERROR = { type: 'error'; message: string };
type State = INIT | LOADED | ERROR | LOADING;

export type HookState = {
  state: State;
};

export const useGetMembershipPlans = () => {
  const [state, setState] = useState<State>(undefined);

  const fetcher = useCallback(() => {
    return getMembershipPlans();
  }, []);

  const { data } = useFetch<GetMembershipPlansResponse>(fetcher);

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
      const fetchedData = toMembershipPlans(data.data);
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
