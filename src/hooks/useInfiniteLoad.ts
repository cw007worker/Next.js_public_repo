import useSWRInfinite from 'swr/infinite';
import { useEffect, useMemo, useState } from 'react';

type INIT = undefined;
type LOADING = { type: 'loading' };
type LOADED = { type: 'loaded' };
type ERROR = { type: 'error'; message: string };
type State = INIT | LOADED | ERROR | LOADING;

export const useInfiniteLoad = <T>(
  //TODO 型定義したい
  fetcher: (
    arg1: any,
    arg2: any,
    arg3: any,
    arg4: any,
    arg5: any
  ) => Promise<T>,
  getKey: (pageIndex: number, previousPageData: T) => null | Array<any>
) => {
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher
  );

  const currentData = data !== undefined ? data[data.length - 1] : undefined;

  const merged = data ? data.flat() : [];

  const isLoadingInitialData = useMemo(() => {
    return !data && !error;
  }, [data, error]);

  const isError = useMemo(() => {
    return !!error;
  }, [error]);

  const isLoadingMore = useMemo(() => {
    return (
      isLoadingInitialData ||
      (size > 0 && data && typeof data[size - 1] === 'undefined')
    );
  }, [data, isLoadingInitialData, size]);

  const isEmpty = useMemo(() => {
    return data?.length === 0;
  }, [data?.length]);

  const loadMore = () => {
    setSize(size + 1);
  };

  return {
    data: merged,
    error,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isError,
    loadMore,
    currentData,
  };
};
