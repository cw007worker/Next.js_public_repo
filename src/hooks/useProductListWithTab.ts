import { sentryLog } from 'libs/setnry';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { toItemListWithTab } from 'repositories/toViewModel/toItemListWithTab';
import { getUnitsByTagSchema } from 'type/request/getUnitsByTag';
import { GetUnitsByTagResponse } from 'type/response/getUnitsByTag';
import { Unit } from 'type/viewModel/common/unitForProductList';
import { useInfiniteLoad } from './useInfiniteLoad';
import { getUnitsByTag } from 'repositories/getUnitsByTag';

type INIT = undefined;
type LOADING = { type: 'loading' };
type LOADED = { type: 'loaded' };
type ERROR = { type: 'error'; message: string };
type State = INIT | LOADED | ERROR | LOADING;

type Tab = {
  name: string;
  tagId: number;
};

// TODO:ここは環境変数 or APIサーバーから返却される値にしたい。
// staging, 本番, localで、tagのidは異なるので。（DB側を弄って、無理やり同じにする方法もある）
const TABS: Tab[] = [
  // {
  //   name: 'おすすめ',
  //   tagId: Number(process.env.NEXT_PUBLIC_RECOMMEND_TAG_ID),
  // },
  {
    name: 'リップ',
    tagId: Number(process.env.NEXT_PUBLIC_LIP_TAG_ID),
  },
  {
    name: 'ベースメイク',
    tagId: Number(process.env.NEXT_PUBLIC_BASEMAKE_TAG_ID),
  },
  {
    name: 'スキンケア',
    tagId: Number(process.env.NEXT_PUBLIC_SKIN_CARE_TAG_ID),
  },
  {
    name: 'ハイライト',
    tagId: Number(process.env.NEXT_PUBLIC_HIGHLIGHT_TAG_ID),
  },
  {
    name: 'アイシャドウ',
    tagId: Number(process.env.NEXT_PUBLIC_EYESHADOW_TAG_ID),
  },
  {
    name: 'アイブロウ',
    tagId: Number(process.env.NEXT_PUBLIC_EYEBROW_TAG_ID),
  },
  {
    name: 'アイライナー',
    tagId: Number(process.env.NEXT_PUBLIC_EYELINER_TAG_ID),
  },
  {
    name: 'チーク',
    tagId: Number(process.env.NEXT_PUBLIC_CHEEK_TAG_ID),
  },
  {
    name: 'リップクリーム',
    tagId: Number(process.env.NEXT_PUBLIC_LIPBALM_TAG_ID),
  },
  {
    name: 'マスカラ',
    tagId: Number(process.env.NEXT_PUBLIC_MASCARA_TAG_ID),
  },
  {
    name: 'フレグランス',
    tagId: Number(process.env.NEXT_PUBLIC_FRAGRANCE_TAG_ID),
  },
];

export type HookState = {
  isError: boolean;
  isLoadingInitialData: boolean;
  isLoadingMore: boolean | undefined;
  tabs: Tab[];
  list: Unit[] | undefined;
  currentTab: Tab;
  selectTab: (tag: Tab) => void;
  more: () => void;
  isMoreDisable: boolean;
  isLast: boolean;
};

const defaultTab = TABS[0];
const defaultPage = 1;
const defaultCurrentTagId = defaultTab.tagId;
const defaultQuantity = 24;

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

export const useProductListWithTab = (): HookState => {
  const router = useRouter();

  useEffect(() => {
    if (typeof router.query.currentTagId === 'undefined') {
      router.replace(
        {
          query: {
            currentTagId: defaultCurrentTagId,
          },
        },
        undefined,
        {
          scroll: false,
          shallow: true,
        }
      );
    }
  }, [router]);

  const currentTagId = useMemo(() => {
    return typeof router.query.currentTagId === 'string'
      ? Number(router.query.currentTagId)
      : undefined;
  }, [router.query.currentTagId]);

  const currentTab = useMemo(() => {
    return TABS.filter((tab) => {
      return tab.tagId === currentTagId;
    })[0];
  }, [currentTagId]);

  const selectTab = (tab: Tab) => {
    router.push(
      {
        query: {
          currentTagId: tab.tagId,
        },
      },
      undefined,
      {
        scroll: false,
        shallow: true,
      }
    );
  };

  //TODO: 型定義したい
  const fetcher = React.useCallback(
    (key: string, page: number, currentTagId: number) => {
      let parsed;
      try {
        parsed = getUnitsByTagSchema.parse({
          id: currentTagId,
          page,
          per: defaultQuantity,
        });
      } catch (err) {
        console.error(err);
        sentryLog(err);
        throw new Error('パラメーターが不正です。');
      }
      return getUnitsByTag(parsed);
    },
    []
  );

  const getKey = (
    pageIndex: number,
    previousPageData: Awaited<ReturnType<typeof fetcher>>
  ): [string, number, number] | null => {
    const page = defaultPage;

    // 初回
    if (pageIndex === 0) {
      return [
        `${page}/${currentTagId}`,
        page,
        currentTagId ?? defaultCurrentTagId,
      ];
    }
    // 次がないパターン
    if (previousPageData.pagenation.next_page === (null || undefined)) {
      return null;
    }
    // next
    return [
      `${previousPageData.pagenation.next_page}/${currentTagId}`,
      previousPageData!.pagenation.next_page ?? defaultCurrentTagId,
      currentTagId ?? defaultCurrentTagId,
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
  } = useInfiniteLoad<GetUnitsByTagResponse>(fetcher, getKey);
  const formattedData = useMemo(() => {
    return data.map((item) => toItemListWithTab(item));
  }, [data]);
  const formattedCurrentData = useMemo(() => {
    return currentData !== undefined
      ? toItemListWithTab(currentData)
      : undefined;
  }, [currentData]);

  const isLast = useMemo(() => {
    return (
      formattedCurrentData === undefined ||
      formattedCurrentData.pagenation === undefined ||
      formattedCurrentData.pagenation.nextPage === undefined
    );
  }, [formattedCurrentData]);

  const list = useMemo(() => {
    return formattedData.map((data) => data.tag.units);
  }, [formattedData]);

  const more = () => {
    loadMore();
  };

  return {
    isError,
    isLoadingInitialData,
    isLoadingMore,
    tabs: TABS,
    list: list.flat(),
    currentTab,
    selectTab,
    more,
    isMoreDisable: formattedCurrentData?.pagenation.nextPage === null ?? false,
    isLast,
  };
};
