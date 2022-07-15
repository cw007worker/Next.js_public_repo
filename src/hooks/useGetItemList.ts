import { useState, useEffect, useMemo, useCallback } from 'react';
import { useInfiniteLoad } from './useInfiniteLoad';
import { getUnitsSchema } from 'type/request/getUnits';
import { GetUnitsResponse } from 'type/response/getUnits';
import { sentryLog } from 'libs/setnry';
import { getUnits } from 'repositories/getUnits';
import { toProductList } from 'repositories/toViewModel/toProductList';
import { Item } from 'type/viewModel/common/item';
import { getProductsSchema } from 'type/request/getProducts';
import { getProducts } from 'repositories/getProducts';
import { GetProductsResponse } from 'type/response/getProducts';
import { defaultPage, defaultQuantity } from 'hooks/useQuery';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

export type HookState = {
  isError: boolean;
  isLoadingInitialData: boolean;
  isLoadingMore: boolean | undefined;
  items: Item[] | undefined;
  more: () => void;
  isMoreDisable: boolean;
  isLast: boolean;
};

export const useGetItemList = (params: {
  sort?: '-created_at' | 'created_at' | '-price' | 'price' | 'recommended';
  displayColor?: 'true' | 'false';
}): HookState => {
  const fetcher = useCallback(
    // (key: string, page: number, currentTagId: number) => {
    (
      displayColor: 'false' | 'true' = 'false',
      page: string,
      per: string,
      sort:
        | '-created_at'
        | 'created_at'
        | '-price'
        | 'price'
        | 'recommended' = 'recommended'
    ) => {
      let parsed;
      if (displayColor === 'true') {
        try {
          parsed = getProductsSchema.parse({
            page: Number(page),
            per: Number(per),
            sort,
          });
        } catch (err) {
          console.error(err);
          sentryLog(err);
          throw new Error('パラメーターが不正です。');
        }
        return getProducts(parsed);
      } else {
        try {
          parsed = getUnitsSchema.parse({
            page: Number(page),
            per: Number(per),
            sort,
          });
        } catch (err) {
          console.error(err);
          sentryLog(err);
          throw new Error('パラメーターが不正です。');
        }
        return getUnits(parsed);
      }
    },
    []
  );

  /**
   * 各ページのSWRキーを取得する関数
   * nullが返却された場合は、リクエストが行われない
   */
  const getKey = (
    pageIndex: number,
    previousPageData: Awaited<ReturnType<typeof fetcher>>
  ):
    | [
        // displayColor
        'false' | 'true' | undefined,
        //page
        string,
        //per
        string,
        //sort
        (
          | '-created_at'
          | 'created_at'
          | '-price'
          | 'price'
          | 'recommended'
          | undefined
        )
      ]
    | null => {
    if (params.sort === undefined) {
      return null;
    }

    // 初回
    if (pageIndex === 0) {
      return [
        params.displayColor,
        String(defaultPage),
        String(defaultQuantity),
        params.sort,
      ];
    }
    // 次がないパターン
    if (
      previousPageData.pagenation.next_page === null ||
      previousPageData.pagenation.next_page === undefined
    ) {
      return null;
    }
    // next
    return [
      params.displayColor,
      String(previousPageData.pagenation.next_page),
      String(defaultQuantity),
      params.sort,
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
  } = useInfiniteLoad<GetUnitsResponse | GetProductsResponse>(fetcher, getKey);

  const formattedCurrentData = useMemo(() => {
    return currentData !== undefined ? toProductList(currentData) : undefined;
  }, [currentData]);

  const isLast = useMemo(() => {
    return (
      formattedCurrentData === undefined ||
      formattedCurrentData.pagenation === undefined ||
      formattedCurrentData.pagenation.nextPage === undefined
    );
  }, [formattedCurrentData]);

  const formattedData = useMemo(() => {
    return data.map((item) => toProductList(item));
  }, [data]);

  const items = useMemo(() => {
    return formattedData.map((data) => data.items);
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
    items: items.flat(),
    isLast,
  };
};
