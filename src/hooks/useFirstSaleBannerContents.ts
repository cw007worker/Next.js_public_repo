import { bannerFirstSaleContent } from './../utils/bannerManager';
import { BannerContents } from 'type/common/bannerContent';

export type HookState = {
  bannerContents: BannerContents;
};

export const useFirstSaleBannerContents = (): HookState => {
  return {
    bannerContents: bannerFirstSaleContent,
  };
};
