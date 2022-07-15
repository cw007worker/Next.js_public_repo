import {
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { useFetch } from 'hooks/useFetch';
import React from 'react';
import { getRankingTags } from 'repositories/getRankingTags';
import { GetRankingTagsResponse } from 'type/response/getRankingTags';
import { RankingTag } from 'type/viewModel/common/rankingTag';
import { toRankingTags } from 'repositories/toViewModel/toRankingTags';
import router from 'next/router';

type INIT = undefined;
type LOADING = { type: 'loading' };
type LOADED = {
  type: 'loaded';
  data: RankingTag[];
};
type ERROR = { type: 'error'; message: string };
type State = INIT | LOADED | ERROR | LOADING;

export type HookState = {
  state: State;
  handleMore: (tagId: number) => void;
};

export const useGetRankingContents = () => {
  const [state, setState] = React.useState<State>(undefined);
  const handleMore = (tagId: number) => {
    router.push({
      pathname: '/ranking',
      query: { tag: tagId },
    });
  };

  const fetcher = React.useCallback(() => {
    return getRankingTags();
  }, []);

  const { data } = useFetch<GetRankingTagsResponse>(fetcher);

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
      const fetchedData = toRankingTags(data.data);
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

  return { state, handleMore };
};
