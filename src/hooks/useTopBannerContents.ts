import {
  bannerTopContents,
  bannerTopContentsForNonMembership,
} from 'utils/bannerManager';
import { useSwiper } from 'hooks/useSwiper';
import Swiper from 'swiper';
import { BannerContents } from 'type/common/bannerContent';
import { useUserContext } from 'context/userContext';
import { useMemo } from 'react';
import { isLoadingState, isSuccessState } from 'type/util/fetchData';

export type HookState = {
  swiper: {
    setSwiperInstance: (swiper: Swiper) => void;
    nextSlide: () => void;
    prevSlide: () => void;
    toSlide: (index: number) => void;
    currentSlide: number;
    setCurrentSlide: (index: number) => void;
    slideLength: number;
    setSlideLength: (lenght: number) => void;
  };
  bannerContents: BannerContents;
  isLoading: boolean;
};

export const useTopBannerContents = (): HookState => {
  const swiper = useSwiper();
  const user = useUserContext();
  const isMembership = useMemo(() => {
    return isSuccessState(user) && user.data.isMembership;
  }, [user]);

  const bannerContents = useMemo(() => {
    return isMembership ? bannerTopContents : bannerTopContentsForNonMembership;
  }, [isMembership]);

  const isLoading = useMemo(() => {
    return isLoadingState(user);
  }, [user]);

  return {
    swiper,
    bannerContents,
    isLoading,
  };
};
