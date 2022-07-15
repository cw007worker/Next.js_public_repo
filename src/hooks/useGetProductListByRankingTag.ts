import { GetProductsByRankingTagResponse } from 'type/response/getProductsByRankingTag';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useInfiniteLoad } from 'hooks/useInfiniteLoad';
import { sentryLog } from 'libs/setnry';
import { useRouter } from 'next/router';
import { getProductsByRankingTagSchema } from 'type/request/getProductsByRankingTag';
import { Unit } from 'type/viewModel/common/unitForProductList';
import { TagInfo } from 'type/viewModel/common/tagInfo';
import { getProductsByRankingTag } from 'repositories/getProductsByRankingTag';
import { toProductListByRankingTag } from 'repositories/toViewModel/toProductListByRankingTag';
import { getBannerImage } from 'utils/bannerManager';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

export type HookState = {
  isError: boolean;
  isLoadingInitialData: boolean;
  isLoadingMore: boolean | undefined;
  tagInfo: TagInfo | undefined;
  list: Unit[] | undefined;
  more: () => void;
  isLast: boolean;
};

const defaultPage = 1;
const defaultQuantity = 24;

export const useGetProductListByRankingTag = (): HookState => {
  const router = useRouter();
  const tagId = Number(router.query.tag);

  const fetcher = useCallback(
    (key: string, page: number, currentTagId: number) => {
      let parsed;
      try {
        parsed = getProductsByRankingTagSchema.parse({
          id: tagId,
          page,
          per: defaultQuantity,
        });
      } catch (err) {
        console.error(err);
        sentryLog(err);
        throw new Error('パラメーターが不正です。');
      }
      return getProductsByRankingTag(parsed);
    },
    [tagId]
  );

  const getKey = (
    pageIndex: number,
    previousPageData: Awaited<ReturnType<typeof fetcher>>
  ): [string, number, number] | null => {
    const page = defaultPage;

    // 初回
    if (pageIndex === 0) {
      return [`${page}/${tagId}`, page, tagId];
    }
    // 次がないパターン
    if (previousPageData.pagenation.next_page === (null || undefined)) {
      return null;
    }
    // next
    return [
      `${previousPageData.pagenation.next_page}/${tagId}`,
      previousPageData!.pagenation.next_page ?? tagId,
      tagId,
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
  } = useInfiniteLoad<GetProductsByRankingTagResponse>(fetcher, getKey);

  const formattedData = useMemo(() => {
    return data.map((item) => toProductListByRankingTag(item));
  }, [data]);

  const formattedCurrentData = useMemo(() => {
    return currentData !== undefined
      ? toProductListByRankingTag(currentData)
      : undefined;
  }, [currentData]);

  const list = useMemo(() => {
    return formattedData.map((data) =>
      data.rankingTag.products.map((product) => product.unit)
    );
  }, [formattedData]);

  const tagInfo = useMemo(() => {
    if (formattedCurrentData == undefined) return;

    return {
      name: formattedCurrentData.rankingTag.name,
      description: undefined,
      campaign: undefined,
      image: getBannerImage(formattedCurrentData.rankingTag.id, 'Ranking')?.image,
    };
  }, [formattedCurrentData]);

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
    tagInfo,
    more,
    isLast,
  };
};
