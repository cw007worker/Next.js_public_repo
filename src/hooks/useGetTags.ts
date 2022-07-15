import { useCallback, useMemo } from 'react';
import { useFetch } from './useFetch';
import { sentryLog } from 'libs/setnry';
import { createSuccessState, isSuccessState } from 'type/util/fetchData';
import { getTags } from 'repositories/getTags';
import { toTags } from 'repositories/toViewModel/toTags';
import { GetTagsResponse } from 'type/response/getTags';

export const useGetTags = () => {
  const fetcher = useCallback(() => {
    return getTags({});
  }, []);

  const { data } = useFetch<GetTagsResponse>(fetcher);

  const formatted = useMemo(() => {
    return isSuccessState(data) ? createSuccessState(toTags(data.data)) : data;
  }, [data]);

  return {
    data: formatted,
  };
};
