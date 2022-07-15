import { Box, BoxProps, Center } from '@chakra-ui/layout';
import { css } from '@emotion/react';
import { LeftVectorWithShadow } from 'components/atoms/Vector/withShadow/left';
import { ProductCard } from 'components/molecules/ProductCard';
import { TextWithRibbon } from 'components/molecules/TextWithRibbon';
import { useSwiper } from 'hooks/useSwiper';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import Link from 'next/link';
import RoundedButton from 'components/atoms/RoundedButton';
import { RightVectorWithShadow } from 'components/atoms/Vector/withShadow/right';
import { RightVector } from 'components/atoms/Vector/right';
import { Unit } from 'type/viewModel/common/unitForProductList';
import { Button } from 'components/atoms/Button';

type Props = {
  bgImage?: string;
  title: string;
  contents: Unit[];
} & BoxProps;
export const ProductCardSlideContent: React.VFC<Props> = ({
  bgImage,
  title,
  contents,
  ...rest
}) => {
  const swiper = useSwiper();

  return (
    <Box {...rest}>
      <Box
        bgImage={bgImage || undefined}
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPos="top"
        py="5"
      >
        <TextWithRibbon mx="auto">{title}</TextWithRibbon>
        {contents && contents.length > 0 && (
          <React.Fragment>
            <Box py="5">
              <Box position="relative">
                <Center
                  w="50px"
                  h="full"
                  position="absolute"
                  top="0"
                  right="50%"
                  mr="87.5px"
                >
                  <Box
                    as="button"
                    zIndex="sticky"
                    onClick={() => swiper.prevSlide()}
                  >
                    <LeftVectorWithShadow w="4" h="5" />
                  </Box>
                </Center>
                <Center
                  w="50px"
                  h="full"
                  position="absolute"
                  top="0"
                  left="50%"
                  ml="87.5px"
                >
                  <Box
                    as="button"
                    zIndex="sticky"
                    onClick={() => swiper.nextSlide()}
                  >
                    <RightVectorWithShadow w="4" h="5" />
                  </Box>
                </Center>
                <Swiper
                  onSwiper={(s) => swiper.setSwiperInstance(s)}
                  onActiveIndexChange={(s) =>
                    swiper.setCurrentSlide(s.activeIndex)
                  }
                  observer={true}
                  observeParents={true}
                  spaceBetween={50}
                  slidesPerView={'auto'}
                  centeredSlides={true}
                  loop={true}
                  css={css`
                    width: 100%;
                  `}
                >
                  {contents.map((content, i) => (
                    <SwiperSlide key={i} style={{ width: 'auto' }}>
                      <ProductCard
                        purchaseRoute={content.purchaseRoute}
                        unitId={content.unitId}
                        productId={content.productId}
                        price={content.price}
                        name={content.brandName}
                        images={content.images}
                        originalPrice={content.originalPrice}
                        w="175px"
                        mx="auto"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            </Box>
            <Box textAlign="center" py="2.5">
              <Link
                href={{
                  pathname: '/products',
                  query: {
                    productId:
                      contents[swiper.currentSlide % contents.length]
                        ?.productId,
                    unitId:
                      contents[swiper.currentSlide % contents.length]?.unitId,
                  },
                }}
                passHref
              >
                <Button as="a" h="12" w="163px" position="relative">
                  もっと見る
                  <Center h="full" position="absolute" right="5">
                    <RightVector w="2" h="3" />
                  </Center>
                </Button>
              </Link>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
};
