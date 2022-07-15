import { useState, useCallback, useEffect, useMemo } from 'react';
import { useInfiniteLoad } from 'hooks/useInfiniteLoad';
import { sentryLog } from 'libs/setnry';
import { useRouter } from 'next/router';
import { Unit } from 'type/viewModel/common/unitForProductList';
import { getUnitsBySearchSchema } from 'type/request/getUnitsBySearch';
import { getUnitsBySearch } from 'repositories/getUnitsBySearch';
import { GetUnitListResponse } from 'type/response/getUnitList';
import { toUnitList } from 'repositories/toViewModel/toUnitList';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

export type HookState = {
  isError: boolean;
  isLoadingInitialData: boolean;
  isLoadingMore: boolean | undefined;
  list: Unit[] | undefined;
  more: () => void;
  isLast: boolean;
  keyword: string;
};

const defaultPage = 1;
const defaultQuantity = 24;

export const useGetUnitsBySearch = (): HookState => {
  const router = useRouter();
  const keyword = useMemo(() => {
    if (router.pathname == '/search') {
      return router.query.keyword
        ? decodeURI(router.query.keyword as string)
        : '';
    } else {
      return '';
    }
  }, [router, router.query, router.query.keyword]);

  const fetcher = useCallback(
    (key: string, page: number, currentTagId: number) => {
      let parsed;
      try {
        parsed = getUnitsBySearchSchema.parse({
          keyword,
          page,
          per: defaultQuantity,
        });
      } catch (err) {
        console.error(err);
        sentryLog(err);
        throw new Error('パラメーターが不正です。');
      }
      return getUnitsBySearch(parsed);
    },
    [keyword]
  );

  const getKey = (
    pageIndex: number,
    previousPageData: Awaited<ReturnType<typeof fetcher>>
  ): [string, number | string, string] | null => {
    const page = defaultPage;

    // 初回
    if (pageIndex === 0) {
      return [`${page}/${keyword}`, page, keyword];
    }
    // 次がないパターン
    if (previousPageData.pagenation.next_page === (null || undefined)) {
      return null;
    }
    // next
    return [
      `${previousPageData.pagenation.next_page}/${keyword}`,
      previousPageData!.pagenation.next_page ?? keyword,
      keyword,
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
  } = useInfiniteLoad<GetUnitListResponse>(fetcher, getKey);

  const formattedData = useMemo(() => {
    return data.map((item) => toUnitList(item));
  }, [data]);

  const formattedCurrentData = useMemo(() => {
    return currentData !== undefined ? toUnitList(currentData) : undefined;
  }, [currentData]);

  const list = useMemo(() => {
    return formattedData.map((data) => data.units);
  }, [formattedData]);

  const isLast = useMemo(() => {
    return (
      formattedCurrentData === undefined ||
      formattedCurrentData.pagenation === undefined ||
      formattedCurrentData.pagenation.nextPage === undefined
    );
  }, [formattedCurrentData]);

  const more = () => {
    loadMore();
  };

  return {
    isError,
    isLoadingInitialData,
    isLoadingMore,
    list: list.flat(),
    more,
    isLast,
    keyword,
  };
};
