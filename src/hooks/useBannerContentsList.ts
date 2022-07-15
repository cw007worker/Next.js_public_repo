import { useSwiper } from 'hooks/useSwiper';
import Swiper from 'swiper';
import { BannerContents } from 'type/common/bannerContent';

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
  bannerContentsList: BannerContents[];
};

export const useBannerContentsList = (
  bannerContentsList: BannerContents[]
): HookState => {
  const swiper = useSwiper();

  return {
    swiper,
    bannerContentsList,
  };
};
