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
import { toItemSearchHistories } from 'repositories/toViewModel/toItemSearchHistories';
import { FetchManageState } from 'type/util/fetchData';
import { getItemSearchHistories } from 'repositories/getItemSearchHistories';
import { ItemSearchHistories } from 'type/viewModel/itemSearchHistories';

export type State = FetchManageState<ItemSearchHistories>;

export const useGetItemSearchHistories = () => {
  const [state, setState] = useState<State>(undefined);

  const fetch = useCallback(() => {
    setState(createLoadingState());
    getItemSearchHistories({ sort: '-created_at', limit: 5 })
      .then((res) => {
        setState(createSuccessState(toItemSearchHistories(res)));
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

  const refetch = useCallback(() => {
    fetch();
  }, [fetch]);

  return {
    state,
    refetch,
  };
};
