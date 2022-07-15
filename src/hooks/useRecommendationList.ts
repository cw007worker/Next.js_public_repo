import { useInfiniteLoad } from './useInfiniteLoad';
import { useState, useCallback, useMemo } from 'react';
import { getRecommendations } from 'repositories/getRecommendations';
import { toRecommendationList } from 'repositories/toViewModel/toRecommendationList';
import { GetRecommendationsResponse } from 'type/response/getRecommendations';
import { getRecommendationsSchema } from 'type/request/getRecommendations';
import { sentryLog } from 'libs/setnry';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

type Props = { productId: number }

// NOTE: 該当するproductIdの商品に関連する商品を返す
export const useRecommendationListPage = (props: Props) => {
  const [query, setQuery] = useState<number>(1);
  const defaultPage = 1;
  const defaultQuantity = 24;
  const productId = props.productId;

  const fetcher = useCallback(
    (key: string, page: number, currentTagId: number, productId: number) => {
      let parsed;
      try {
        parsed = getRecommendationsSchema.parse({ page, per: defaultQuantity, product_id: productId });
      } catch (err) {
        console.error(err);
        sentryLog(err);
        throw new Error('パラメーターが不正です。');
      }
      return getRecommendations(parsed);
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
  ): [string, number | string, string, number] | null => {
    const page = defaultPage;

    // 初回
    if (pageIndex === 0) {
      return [`${page}/recommendations`, page, 'recommendations', productId];
    }
    // 次がないパターン
    if (previousPageData.pagenation.next_page === (null || undefined)) {
      return null;
    }
    // next
    return [
      `${previousPageData.pagenation.next_page}/recommendations`,
      previousPageData!.pagenation.next_page ?? 'recommendations',
      'recommendations', productId
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
  } = useInfiniteLoad<GetRecommendationsResponse>(fetcher, getKey);

  const formattedCurrentData = useMemo(() => {
    return currentData !== undefined
      ? toRecommendationList(currentData)
      : undefined;
  }, [currentData]);

  const isLast = useMemo(() => {
    return (
      formattedCurrentData === undefined ||
      formattedCurrentData.pagenation === undefined ||
      formattedCurrentData.pagenation.nextPage === undefined
    );
  }, [formattedCurrentData]);

  const formattedData = useMemo(() => {
    return data.map((item) => toRecommendationList(item));
  }, [data]);

  const list = useMemo(() => {
    return formattedData.map((data) => data.recommendations);
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
