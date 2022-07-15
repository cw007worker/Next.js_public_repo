import { useState, useCallback, useEffect, useMemo } from 'react';
import { useInfiniteLoad } from 'hooks/useInfiniteLoad';
import { sentryLog } from 'libs/setnry';
import { getDeliveriesSchema } from 'type/request/getDeliveries';
import { getDeliveries } from 'repositories/getDeliveries';
import { GetDeliveriesResponse } from 'type/response/getDeliveries';
import { toDeliveries } from 'repositories/toViewModel/toDeliveries';
import { Delivery, DeliveryStatus } from 'type/viewModel/delivery';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

export type HookState = {
  isError: boolean;
  isLoadingInitialData: boolean;
  isLoadingMore: boolean | undefined;
  list: Delivery[] | undefined;
  more: () => void;
  isLast: boolean;
};

const defaultPage = 1;
const defaultQuantity = 10;

export const useGetDeliveries = (params: {
  status: DeliveryStatus | 'all';
}): HookState => {
  const { status } = params;

  const fetcher = useCallback(
    (key: string, page: number, currentTagId: number) => {
      let parsed;
      try {
        parsed = getDeliveriesSchema.parse({
          status,
          page,
          per: defaultQuantity,
        });
      } catch (err) {
        console.error(err);
        sentryLog(err);
        throw new Error('パラメーターが不正です。');
      }
      return getDeliveries(parsed);
    },
    [status]
  );

  const getKey = (
    pageIndex: number,
    previousPageData: Awaited<ReturnType<typeof fetcher>>
  ): [string, number | string, string] | null => {
    const page = defaultPage;

    // 初回
    if (pageIndex === 0) {
      return [`${page}/${status}`, page, status];
    }
    // 次がないパターン
    if (previousPageData.pagenation.next_page === (null || undefined)) {
      return null;
    }
    // next
    return [
      `${previousPageData.pagenation.next_page}/${status}`,
      previousPageData!.pagenation.next_page ?? status,
      status,
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
  } = useInfiniteLoad<GetDeliveriesResponse>(fetcher, getKey);

  const formattedData = useMemo(() => {
    return data.map((item) => toDeliveries(item));
  }, [data]);

  const formattedCurrentData = useMemo(() => {
    return currentData !== undefined ? toDeliveries(currentData) : undefined;
  }, [currentData]);

  const list = useMemo(() => {
    return formattedData.map((data) => data.deliveries);
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
  };
};
