import { useCallback, useState } from 'react';
import { Swiper } from 'swiper';

export const useSwiper = () => {
  const [swiperInstance, setSwiperInstance] = useState<Swiper | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideLength, setSlideLength] = useState(0);

  const nextSlide = useCallback(() => {
    if (swiperInstance) {
      if (!swiperInstance.isEnd) {
        swiperInstance.slideNext();
      }
    }
  }, [swiperInstance]);

  const prevSlide = useCallback(() => {
    if (swiperInstance) {
      if (!swiperInstance.isBeginning) {
        swiperInstance.slidePrev();
      }
    }
  }, [swiperInstance]);

  const toSlide = useCallback(
    (index: number) => {
      if (swiperInstance) {
        swiperInstance.slideTo(index);
      }
    },
    [swiperInstance]
  );

  return {
    nextSlide,
    prevSlide,
    toSlide,
    setSwiperInstance,
    currentSlide,
    setCurrentSlide,
    slideLength,
    setSlideLength,
  };
};
