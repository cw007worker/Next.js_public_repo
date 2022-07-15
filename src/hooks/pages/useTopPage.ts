import { BannerContents } from 'type/common/bannerContent';
import { bannerTopContentsForGrid } from './../../utils/bannerManager';
import { PartialUnits } from 'type/viewModel/partialUnits';
import {
  usePartialProducts,
  HookState as PartialProductsHookState,
} from '../usePartialProducts';
import {
  useGetRankingContents,
  HookState as RankingContentsState,
} from 'hooks/useGetRankingContents';
import { useAppState } from './../useAppState';
import React, { useMemo } from 'react';
import { useProductListWithTab } from './../useProductListWithTab';
import { HookState as ProductListWithTabHookState } from 'hooks/useProductListWithTab';
import { useLayout, HookState as LayoutState } from 'hooks/useLayout';
import {
  HookState as brandContentsHookState,
  useBrandContents,
} from 'hooks/useBrandContents';
import {
  HookState as topBannerContentsHookState,
  useTopBannerContents,
} from 'hooks/useTopBannerContents';
import { PARTIAL_PRODUCTS } from 'constants/partialUnits';

export type HookState = {
  productListWithTab: ProductListWithTabHookState;
  topBannerContents: topBannerContentsHookState;
  layoutState: LayoutState;
  brandContents: brandContentsHookState;
  rankingContents: RankingContentsState;
  partialUnitsList: PartialProductsHookState[];
  isApp: boolean;
};

export const useTopPage = () => {
  const productListWithTab = useProductListWithTab();
  const layoutState = useLayout();
  const topBannerContents = useTopBannerContents();
  // TODO: ホーム画面はコンテンツの入れ替わりが多分激しいので、TopContentsを分解した方が良さそうかも
  const brandContents = useBrandContents();

  const partialUnitsList = PARTIAL_PRODUCTS.map((partialUnit, index) => {
    return usePartialProducts(partialUnit);
  });
  // const newGoodalProducts = usePartialUnits(PARTIAL_PRODUCTS.newGoodal);

  // ランキングコンテンツ（とりあえず初売りのやつ使いまわしてる）
  const rankingContents = useGetRankingContents();

  const { isApp } = useAppState();

  return {
    productListWithTab,
    topBannerContents,
    layoutState,
    brandContents,
    rankingContents,
    partialUnitsList,
    isApp,
  };
};
