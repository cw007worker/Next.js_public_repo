import { useLayout, HookState as LayoutState } from 'hooks/useLayout';
import {
  useGetBrandItemList,
  HookState as GetBrandsItemState,
} from 'hooks/useGetBrandItemList';
import { useDisclosure } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo } from 'react';
import {
  useQuery,
  HookState as QueryState,
  defaultDisplayColor,
} from 'hooks/useQuery';
import { useRouter } from 'next/router';
import { useGetBrandCategories } from 'hooks/useGetBrandCategories';
import { FetchManageState, isSuccessState } from 'type/util/fetchData';
import { CategoryList } from 'type/viewModel/categoryList';
import { ChildCategory } from 'type/viewModel/common/childCategory';

export type HookState = {
  layoutState: LayoutState;
  brandItemListState: GetBrandsItemState;
  isOpenSortDrawer: boolean;
  isOpenFilterByCategoriesDrawer: boolean;
  handleSortDrawer: (isOpen: boolean) => void;
  handleFilterByCategoriesDrawer: (isOpen: boolean) => void;
  handleToggleDisplayColor: () => void;
  queryState: QueryState;
  handleGetBrandCategories: () => void;
  getBrandCategoriesState: FetchManageState<CategoryList>;
  selectedBrandCategory:
    | {
        id: string;
        name: string;
        child_categories: Omit<ChildCategory, 'data'>[] | undefined;
      }
    | {
        id: string;
        name: string;
      }
    | undefined;
};

export const useBrandsPage = (): HookState => {
  const queryState = useQuery();
  const router = useRouter();
  const brandItemListState = useGetBrandItemList({
    brandId: router.query.brandId as string | undefined,
    sort: queryState.query.sort,
    category_ids: queryState.query.category_ids,
    displayColor: queryState.query.displayColor,
  });
  const layoutState = useLayout();
  const { request: getBrandCategoriesRequest, data: getBrandCategoriesState } =
    useGetBrandCategories();
  const sortDrawerRef = React.useRef<HTMLDivElement>(null);
  const {
    isOpen: isOpenSortDrawer,
    onClose: onCloseSortDrawer,
    onOpen: onOpenSortDrawer,
  } = useDisclosure();

  const filterByCategoriesDrawerRef = React.useRef<HTMLDivElement>(null);
  const {
    isOpen: isOpenFilterByCategoriesDrawer,
    onClose: onCloseFilterByCategoriesDrawer,
    onOpen: onOpenFilterByCategoriesDrawer,
  } = useDisclosure();

  const handleSortDrawer = (isOpen: boolean) => {
    isOpen ? onOpenSortDrawer() : onCloseSortDrawer();
  };

  const handleFilterByCategoriesDrawer = (isOpen: boolean) => {
    isOpen
      ? onOpenFilterByCategoriesDrawer()
      : onCloseFilterByCategoriesDrawer();
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

  const handleGetBrandCategories = useCallback(() => {
    getBrandCategoriesRequest(router.query.brandId);
  }, [getBrandCategoriesRequest, router.query.brandId]);

  const selectedBrandCategory = useMemo(() => {
    let selected:
      | {
          id: string;
          name: string;
          data: Omit<CategoryList, 'child_category'>[] | undefined;
        }
      | {
          id: string;
          name: string;
        }
      | undefined;
    if (
      isSuccessState(getBrandCategoriesState) &&
      queryState.isReady &&
      typeof queryState.query.category_ids === 'string'
    ) {
      const categoryId = queryState.query.category_ids;
      getBrandCategoriesState.data.forEach((category) => {
        if (category.id === categoryId) {
          return (selected = category);
        } else if (category.childCategories !== undefined) {
          return category.childCategories.forEach((child) => {
            if (child.id === categoryId) {
              selected = child;
              return;
            }
          });
        }
      });
    }
    return selected;
  }, [getBrandCategoriesState, queryState]);

  useEffect(() => {
    if (queryState.isReady && typeof router.query.brandId !== undefined) {
      handleGetBrandCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryState.isReady, router.query.brandId]);

  useEffect(() => {
    onCloseSortDrawer();
  }, [router.query.sort]);

  useEffect(() => {
    onCloseFilterByCategoriesDrawer();
  }, [router.query.category_ids]);

  return {
    layoutState,
    brandItemListState,
    isOpenSortDrawer,
    isOpenFilterByCategoriesDrawer,
    handleFilterByCategoriesDrawer,
    handleSortDrawer,
    handleToggleDisplayColor,
    queryState,
    handleGetBrandCategories,
    getBrandCategoriesState,
    selectedBrandCategory,
  };
};
