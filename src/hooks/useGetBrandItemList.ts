import { useState, useCallback, useEffect, useMemo } from 'react';
import { useInfiniteLoad } from 'hooks/useInfiniteLoad';
import { sentryLog } from 'libs/setnry';
import { useRouter } from 'next/router';
import { getBrandProducts } from 'repositories/getBrandProducts';
import { getBrandUnits } from 'repositories/getBrandUnits';
import { toItemList } from 'repositories/toViewModel/toItemList';
import { getBrandProductsByIdSchema } from 'type/request/getBrandProductsById';
import { GetBrandProductsResponse } from 'type/response/getBrandProducts';
import { GetBrandUnitsResponse } from 'type/response/getBrandUnits';
import { getBrandUnitsByIdSchema } from 'type/request/getBrandUnitsById';
import { Item } from 'type/viewModel/common/item';
import { ListItem } from 'type/viewModel/common/listItem';
import { defaultPage, defaultQuantity } from 'hooks/useQuery';
import { getBannerImage } from 'utils/bannerManager';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

export type HookState = {
  isError: boolean;
  isLoadingInitialData: boolean;
  isLoadingMore: boolean | undefined;
  listMeta: Pick<ListItem, 'id' | 'name' | 'description' | 'image'> | undefined;
  items: Item[] | undefined;
  more: () => void;
  isLast: boolean;
};

export const useGetBrandItemList = (params: {
  brandId?: string;
  sort?: '-created_at' | 'created_at' | '-price' | 'price' | 'recommended';
  category_ids?: string;
  displayColor?: 'true' | 'false';
}): HookState => {
  const fetcher = useCallback(
    (
      brandId: string,
      displayColor: 'false' | 'true' = 'false',
      page: string,
      per: string,
      sort:
        | '-created_at'
        | 'created_at'
        | '-price'
        | 'price'
        | 'recommended' = 'recommended',
      category_ids: string[] | undefined | string = undefined
    ) => {
      let parsed;
      if (displayColor === 'true') {
        try {
          parsed = getBrandProductsByIdSchema.parse({
            id: Number(brandId),
            page: Number(page),
            per: Number(per),
            sort,
            category_ids,
          });
        } catch (err) {
          console.error(err);
          sentryLog(err);
          throw new Error('パラメーターが不正です。');
        }
        return getBrandProducts(parsed);
      } else if (displayColor === 'false') {
        try {
          parsed = getBrandUnitsByIdSchema.parse({
            id: Number(brandId),
            page: Number(page),
            per: Number(per),
            sort,
            category_ids,
          });
        } catch (err) {
          console.error(err);
          sentryLog(err);
          throw new Error('パラメーターが不正です。');
        }
        return getBrandUnits(parsed);
      } else {
        throw new Error('予期せぬエラー。');
      }
    },
    []
  );

  const getKey = (
    pageIndex: number,
    previousPageData: Awaited<ReturnType<typeof fetcher>>
  ):
    | [
        // id
        string | undefined,
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
        ),
        //category_ids
        string | undefined
      ]
    | null => {
    // next routerは初期ロード時にqueryをundefinedで返す。なのでidがundefinedの際はreturn null
    // @see https://zenn.dev/kiyokiyoabc/articles/d3a8464367094a
    if (params.brandId === undefined) {
      return null;
    }
    // 初回
    if (pageIndex === 0) {
      return [
        params.brandId,
        params.displayColor,
        String(defaultPage),
        String(defaultQuantity),
        params.sort,
        params.category_ids,
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
      params.brandId,
      params.displayColor,
      String(previousPageData.pagenation.next_page),
      String(defaultQuantity),
      params.sort,
      params.category_ids,
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
  } = useInfiniteLoad<GetBrandProductsResponse | GetBrandUnitsResponse>(
    fetcher,
    getKey
  );

  // 今までロードしたすべてのData
  const formattedData = useMemo(() => {
    return data.map((item) => toItemList(item));
  }, [data]);

  // 直近でロードしたData
  const formattedCurrentData = useMemo(() => {
    return currentData !== undefined ? toItemList(currentData) : undefined;
  }, [currentData]);

  const items = useMemo(() => {
    return formattedData.map((data) => data.listItem.items);
  }, [formattedData]);

  const listMeta = useMemo(() => {
    if (formattedCurrentData == undefined) return;
    return {
      id: formattedCurrentData.listItem.id,
      name: formattedCurrentData.listItem.name,
      description: formattedCurrentData.listItem.description,
      image: getBannerImage(formattedCurrentData.listItem.id, 'Brand')?.image,
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
    items: items.flat(),
    listMeta,
    more,
    isLast,
  };
};
