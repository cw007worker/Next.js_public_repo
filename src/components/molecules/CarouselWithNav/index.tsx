import * as React from 'react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/thumbs/thumbs.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Image, Box, Skeleton, BoxProps } from '@chakra-ui/react';
import ISwiper from 'swiper';
import { Nav } from './Nav';

type Props = {
  setSwiperInstance: (swiper: ISwiper) => void;
  setActiveIndex: (index: number) => void;
  setSlideLength: (length: number) => void;
  prev: () => void;
  next: () => void;
  images:
    | {
        alt: string;
        url: string;
      }[]
    | undefined;
} & BoxProps;

const Component: React.FC<Props> = ({
  setSwiperInstance,
  setActiveIndex,
  setSlideLength,
  prev,
  next,
  images,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <Nav
        prev={prev}
        next={next}
        hidden={images === undefined || images.length <= 1}
      >
        <Swiper
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          onActiveIndexChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          // onInit={(swiper) => setSlideLength(swiper.slides.length)}
          onSlidesLengthChange={(swiper) =>
            setSlideLength(swiper.slides.length)
          }
        >
          {images !== undefined &&
            images.map((image, i) => {
              return (
                <SwiperSlide key={i}>
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fallbackSrc="static/Fallback/FallbackLarge.svg"
                    objectFit="contain"
                    marginX="auto"
                    maxH="279px"
                    m="0 auto"
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </Nav>
    </Box>
  );
};

export const CarouselWithNav = React.memo(Component);
