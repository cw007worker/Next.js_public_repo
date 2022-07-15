import * as React from 'react';
import 'swiper/swiper.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Image,
  Box,
  Skeleton,
  BoxProps,
  AspectRatio,
  AspectRatioProps,
} from '@chakra-ui/react';
import ISwiper, { Autoplay } from 'swiper';
import { OptimizedImage } from 'components/atoms/OptimizedImage';
import { BannerContent } from 'components/organisms/BannerContent';

import Link from 'next/link';

type Props = {
  setSwiperInstance: (swiper: ISwiper) => void;
  setActiveIndex: (index: number) => void;
  setSlideLength: (length: number) => void;
  prev: () => void;
  next: () => void;
  autoPlay?: boolean;
  loop?: boolean;
  contents: {
    image: {
      alt: string;
      src: string;
    };
    href?: {
      pathname: string;
      query?: any; // TODO: anyやめよう
    };
  }[];
} & AspectRatioProps;

ISwiper.use([Autoplay]);

const Component: React.FC<Props> = ({
  setSwiperInstance,
  setActiveIndex,
  setSlideLength,
  prev,
  next,
  contents,
  autoPlay,
  loop,
  ...rest
}) => {
  return (
    <Swiper
      onSwiper={(swiper) => setSwiperInstance(swiper)}
      onActiveIndexChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      // onInit={(swiper) => setSlideLength(swiper.slides.length)}
      onSlidesLengthChange={(swiper) => setSlideLength(swiper.slides.length)}
      autoplay={Boolean(autoPlay)}
      //@see https://github.com/nolimits4web/swiper/issues/2621
      loop={contents.length > 1}
      watchOverflow={true}
    >
      {contents !== undefined &&
        contents.map((content, i) => {
          return (
            <SwiperSlide key={i}>
              <BannerContent content={content} {...rest} />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export const CarouselWithLink = React.memo(Component);
