import React from 'react';
import { Box, Text, BoxProps } from '@chakra-ui/layout';
import { CarouselWithLink } from 'components/molecules/CarouselWithLink';
import { HookState } from 'hooks/useBannerContentsList';

export const SpecialEditionContents: React.VFC<HookState> = (props) => {
  return (
    <React.Fragment>
      {props.bannerContentsList.map((bannerContents, i) => (
        <CarouselWithLink
          key={i}
          setActiveIndex={props.swiper.setCurrentSlide}
          setSlideLength={props.swiper.setSlideLength}
          setSwiperInstance={props.swiper.setSwiperInstance}
          prev={props.swiper.prevSlide}
          next={props.swiper.nextSlide}
          autoPlay={true}
          loop={true}
          contents={bannerContents}
          mb="4"
          ratio={2.678}
        />
      ))}
    </React.Fragment>
  );
};
