import { useState, useEffect, useMemo, useCallback } from 'react';
import { useInfiniteLoad } from './useInfiniteLoad';
import { getUnitsSchema } from 'type/request/getUnits';
import { GetUnitsResponse } from 'type/response/getUnits';
import { sentryLog } from 'libs/setnry';
import { Unit } from 'type/viewModel/common/unitForProductList';
import { getWishlist } from 'repositories/getWishlist';
import { toWishlist } from 'repositories/toViewModel/toWishlist';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

export type HookState = {
  isError: boolean;
  isLoadingInitialData: boolean;
  isLoadingMore: boolean | undefined;
  list: Unit[] | undefined;
  more: () => void;
  isMoreDisable: boolean;
  isLast: boolean;
};

const defaultPage = 1;

export const useGetWishlist = () => {
  const [query, setQuery] = useState<number>(1);

  const fetcher = useCallback(
    (key: string, page: number, currentTagId: number) => {
      let parsed;
      try {
        parsed = getUnitsSchema.parse({ page });
      } catch (err) {
        console.error(err);
        sentryLog(err);
        throw new Error('パラメーターが不正です。');
      }
      return getWishlist(parsed);
    },
    [query]
  );

  /**
   * 各ページのSWRキーを取得する関数
   * nullが返却された場合は、リクエストが行われない
   */
  const getKey = (
    pageIndex: number,
    previousPageData: Awaited<ReturnType<typeof fetcher>>
  ): [string, number | string, string] | null => {
    const page = defaultPage;

    // 初回
    if (pageIndex === 0) {
      return [`${page}/wishlists`, page, 'wishlists'];
    }
    // 次がないパターン
    if (previousPageData.pagenation.next_page === (null || undefined)) {
      return null;
    }
    // next
    return [
      `${previousPageData.pagenation.next_page}/wishlists`,
      previousPageData!.pagenation.next_page ?? 'wishlists',
      'wishlists',
    ];
  };

  const {
    data,
    error,
    currentData,
    loadMore,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isError,
  } = useInfiniteLoad<GetUnitsResponse>(fetcher, getKey);

  const formattedCurrentData = useMemo(() => {
    return currentData !== undefined ? toWishlist(currentData) : undefined;
  }, [currentData]);

  const isLast = useMemo(() => {
    return (
      formattedCurrentData === undefined ||
      formattedCurrentData.pagenation === undefined ||
      formattedCurrentData.pagenation.nextPage === undefined
    );
  }, [formattedCurrentData]);

  const formattedData = useMemo(() => {
    return data.map((item) => toWishlist(item));
  }, [data]);

  const list = useMemo(() => {
    return formattedData.map((data) => data.units);
  }, [formattedData]);

  const more = () => {
    loadMore();
  };

  return {
    isError,
    isLoadingInitialData,
    isLoadingMore,
    more,
    isMoreDisable: formattedCurrentData?.pagenation.nextPage === null ?? false,
    list: list.flat(),
    isLast,
  };
};
