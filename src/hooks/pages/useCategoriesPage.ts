import { useLayout, HookState as LayoutState } from 'hooks/useLayout';
import {
  useGetCategoryItemList,
  HookState as GetCategoryItemListState,
} from 'hooks/useGetCategoryItemList';
import { useDisclosure } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo } from 'react';
import {
  useQuery,
  HookState as QueryState,
  defaultDisplayColor,
} from 'hooks/useQuery';
import { useRouter } from 'next/router';
import { useGetCategoryBrands } from 'hooks/useGetCategoryBrands';
import { FetchManageState, isSuccessState } from 'type/util/fetchData';
import { BrandList } from 'type/viewModel/brandList';
import { Brand } from 'type/viewModel/common/brand';

export type HookState = {
  layoutState: LayoutState;
  categoryItemListState: GetCategoryItemListState;
  isOpenSortDrawer: boolean;
  isOpenFilterByBrandsDrawer: boolean;
  handleSortDrawer: (isOpen: boolean) => void;
  handleFilterByBrandsDrawer: (isOpen: boolean) => void;
  handleToggleDisplayColor: () => void;
  queryState: QueryState;
  handleGetCategoryBrands: () => void;
  getCategoryBrandsState: FetchManageState<BrandList>;
  selectedCategoryBrand: any;
};

export const useCategoriesPage = (): HookState => {
  const queryState = useQuery();
  const router = useRouter();
  const categoryItemListState = useGetCategoryItemList({
    categoryId: router.query.categoryId as string | undefined,
    sort: queryState.query.sort,
    brand_ids: queryState.query.brand_ids,
    displayColor: queryState.query.displayColor,
  });
  const layoutState = useLayout();
  const { request: getCategoryBrandsRequest, data: getCategoryBrandsState } =
    useGetCategoryBrands();
  const sortDrawerRef = React.useRef<HTMLDivElement>(null);
  const {
    isOpen: isOpenSortDrawer,
    onClose: onCloseSortDrawer,
    onOpen: onOpenSortDrawer,
  } = useDisclosure();

  const handleSortDrawer = (isOpen: boolean) => {
    isOpen ? onOpenSortDrawer() : onCloseSortDrawer();
  };

  const handleFilterByBrandsDrawer = (isOpen: boolean) => {
    isOpen ? onOpenFilterByBrandsDrawer() : onCloseFilterByBrandsDrawer();
  };

  const handleToggleDisplayColor = () => {
    queryState.handlePushQuery({
      displayColor:
        queryState.query.displayColor === 'true'
          ? 'false'
          : queryState.query.displayColor === 'false'
          ? 'true'
          : defaultDisplayColor === 'false'
          ? 'true'
          : 'false',
    });
  };

  const handleGetCategoryBrands = useCallback(() => {
    getCategoryBrandsRequest(router.query.categoryId);
  }, [getCategoryBrandsRequest, router.query.categoryId]);

  const filterByBrandsDrawerRef = React.useRef<HTMLDivElement>(null);
  const {
    isOpen: isOpenFilterByBrandsDrawer,
    onClose: onCloseFilterByBrandsDrawer,
    onOpen: onOpenFilterByBrandsDrawer,
  } = useDisclosure();

  useEffect(() => {
    if (queryState.isReady && typeof router.query.categoryId !== undefined) {
      handleGetCategoryBrands();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryState.isReady, router.query.categoryId]);

  // categoryBrands 内の brand_id と現在のqueryの状態を比較して、一致した場合はselectedを更新する
  const selectedCategoryBrand = useMemo(() => {
    let selected: Brand | undefined;
    if (
      isSuccessState(getCategoryBrandsState) &&
      typeof queryState.query.brand_ids === 'string'
    ) {
      const brandId = queryState.query.brand_ids;

      getCategoryBrandsState.data.forEach((categoryBrand) => {
        categoryBrand.data.forEach((brand) => {
          if (brand.id === brandId) {
            selected = brand;
            return;
          }
        });
      });
    }
    return selected;
  }, [getCategoryBrandsState, queryState.query.brand_ids]);

  useEffect(() => {
    onCloseSortDrawer();
  }, [router.query.sort]);

  useEffect(() => {
    onCloseFilterByBrandsDrawer();
  }, [router.query.brand_ids]);

  return {
    layoutState,
    categoryItemListState,
    isOpenSortDrawer,
    isOpenFilterByBrandsDrawer,
    handleFilterByBrandsDrawer,
    handleSortDrawer,
    handleToggleDisplayColor,
    queryState,
    handleGetCategoryBrands,
    getCategoryBrandsState,
    selectedCategoryBrand,
  };
};
