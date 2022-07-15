import {
  usePartialProducts,
  HookState as PartialProductsHookState,
} from '../usePartialProducts';
import { useLayout, HookState as LayoutState } from 'hooks/useLayout';
import { PARTIAL_PRODUCTS } from 'constants/newPartialProducts';
import { getBannerImage } from 'utils/bannerManager';
import { BANNERS } from 'constants/banners';
import { BannerContent } from 'type/common/bannerContent';

export type HookState = {
  layoutState: LayoutState;
  partialProductsList: PartialProductsHookState[];
  bannerContent: BannerContent;
};

export const useNewItemListPage = (): HookState => {
  const layoutState = useLayout();

  const bannerContent: BannerContent = {
    image: {
      src: BANNERS.bannerNewArrival.ImagePath,
      alt: 'bannerNewArrival'
    },
    href: {
      pathname: '/itemList',
      query: { sort: '-created_at' },
    }
  };

  const partialProductsList = PARTIAL_PRODUCTS.map((partialUnit, index) => {
    return usePartialProducts(partialUnit);
  });

  return {
    layoutState,
    partialProductsList,
    bannerContent,
  };
};
