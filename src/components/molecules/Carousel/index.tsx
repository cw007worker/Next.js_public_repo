import * as React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/thumbs/thumbs.min.css';

// import Swiper core and required modules
import ISwiper from 'swiper';

type Props = {
  setSwiperInstance: (swiper: ISwiper) => void;
};

export const Carousel: React.FC<Props> = ({ setSwiperInstance, children }) => {
  return (
    <Swiper onSwiper={(swiper) => setSwiperInstance(swiper)}>{children}</Swiper>
  );
};
