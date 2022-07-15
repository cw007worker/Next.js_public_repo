import {
  useFirstSaleCampaign,
  HookState as FirstSaleCampaignState,
} from './../useFirstSaleCampaign';
import {
  useProductCardSlideContent,
  HookState as ProductCardSlideState,
} from './../useProductCardSlideContent';
import { useLayout, HookState as LayoutState } from 'hooks/useLayout';
import React from 'react';
import {
  useGetRankingContents,
  HookState as RankingContentsState,
} from 'hooks/useGetRankingContents';
import {
  HookState as brandContentsHookState,
  useBrandContents,
} from 'hooks/useBrandContents';
import {
  HookState as ProductListWithTabHookState,
  useProductListWithTab,
} from 'hooks/useProductListWithTab';
import { useFirstSaleBannerContents } from 'hooks/useFirstSaleBannerContents';
import { BannerContents } from 'type/common/bannerContent';
import { FIRST_SALE_UNITS } from 'constants/partialUnits';

export type HookState = {
  layoutState: LayoutState;
  springSaleState: FirstSaleCampaignState;
  hallOfFameState: ProductCardSlideState;
  hotTopicOnSnsState: ProductCardSlideState;
  rankingContents: RankingContentsState;
  brandContents: brandContentsHookState;
  productListWithTab: ProductListWithTabHookState;
  bannerContents: BannerContents;
};

export const useFirstSalePage = () => {
  const layoutState = useLayout();
  const springSaleState = useFirstSaleCampaign();
  const hallOfFameState = useProductCardSlideContent(
    FIRST_SALE_UNITS.hallOfFame
  );
  const hotTopicOnSnsState = useProductCardSlideContent(
    FIRST_SALE_UNITS.hotTopicOnSns
  );
  const rankingContents = useGetRankingContents();
  const brandContents = useBrandContents();
  const productListWithTab = useProductListWithTab();
  const { bannerContents } = useFirstSaleBannerContents();

  return {
    layoutState,
    springSaleState,
    hallOfFameState,
    hotTopicOnSnsState,
    rankingContents,
    brandContents,
    productListWithTab,
    bannerContents,
  };
};
