import { VFC } from 'react';
import { ProductDetailWithUniqueUnit } from 'type/viewModel/productDetail';
import {
  GridItem,
  Heading,
  Text,
  Grid,
  Box,
  Flex,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react';
import { CarouselWithNav } from 'components/molecules/CarouselWithNav';
import { Cursol } from 'components/atoms/Cursol';
import { ValietyPicker } from 'components/organisms/VarietyPicker';
import { Price } from 'components/atoms/Price';
import { Thumbanils } from 'components/organisms/Thumbnails';
import Swiper from 'swiper';
import React from 'react';
import { Description } from '../Description';
import { Recommendations } from '../Recommendations';
import { FixedButtonWrapper } from 'components/atoms/FixedButtonWrapper';
import { Button } from 'components/atoms/Button';
import { useVarietiesUnitManager } from 'hooks/useVarietiesUnitManager';
import { PremiumPrice } from 'components/molecules/PremiumPrice';
import { ProductDetailFixedButtons } from '../ProductDetailFixedButtons';
import { OptimizedImage } from 'components/atoms/OptimizedImage';
import { PremiumSalePrice } from 'components/molecules/PremiumSalePrice';
import { DiscountPrice } from 'components/atoms/DiscountPrice';
import { isParallelImport } from 'utils/parallelImport';
import { TagLabel } from 'components/atoms/TagLabel';
import { hasTimesaleTag } from 'utils/TagChecker/timesale';
import { QuestionIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { MembershipGrade } from 'type/viewModel/me';
import { SafeSecureIconGrid } from 'components/molecules/SafeSecureIconGrid';
import { DeliveryDescription } from '../DeliveryDescription';
import { SafeSecureDescription } from 'components/molecules/SafeSecureDescription';
import { OnboardingLinkFixedButton } from '../OnboardingLinkFixedButton';

type Props = {
  membershipGrade: MembershipGrade;
  setSwiperInstance: (swiper: Swiper) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  toSlide: (index: number) => void;
  currentSlide: number;
  setCurrentSlide: (index: number) => void;
  slideLength: number;
  setSlideLength: (lenght: number) => void;
} & Extract<ProductDetailWithUniqueUnit, { tag: 'varieties' }>;

export const UnitInfoWithVarieties: VFC<Props> = (props) => {
  const {
    // ユーザーが選んだunitId
    unitId,
    // ユーザーが選んだ個数
    quantity,
    //ユーザーが選んだ商品の個数をセットする関数
    setQuantity,
    //ユーザーが選んだ商品をセットする関数
    handleVarietyChoice,
    //variety pickerに渡すdata
    varieties,
    //ユーザーがチョイスしたvariety
    varietyChoice,
    //varietyの種類
    varietyType,
    //ユーザーがチョイスしたunitIdによってunitの情報を表示する
    selectedUnit,
    //カート追加ボタン
    disableAddCartBtn,
    isLoadingAddCartBtn,
    handleAddCart,
    // お気に入り機能
    isLoadingUpdateWishlistBtn,
    handleUpdateWishlist,
    inWishlist,
  } = useVarietiesUnitManager({
    units: props.units,
    varieties: props.varieties,
  });
  return (
    <React.Fragment>
      <Grid
        templateColumns={{ base: 'initial', md: 'repeat(2,1fr)' }}
        gap={{ base: 'initial', md: '6' }}
        position="relative"
      >
        {/*
         *@see https://github.com/nolimits4web/swiper/issues/2914
         * overflow hiddenがないと画像がはみ出す
         */}
        <GridItem w="100%" overflow="hidden" mb={{ base: 'initial', md: '6' }}>
          <CarouselWithNav
            setActiveIndex={props.setCurrentSlide}
            setSlideLength={props.setSlideLength}
            setSwiperInstance={props.setSwiperInstance}
            prev={props.prevSlide}
            next={props.nextSlide}
            images={selectedUnit?.images || props.images}
            mb="4"
          />
          <Cursol
            current={props.currentSlide}
            length={props.slideLength}
            toSlide={props.toSlide}
            display={{ base: 'block', md: 'none' }}
            mb="4"
            hidden={props.slideLength <= 1}
          />

          <Thumbanils
            images={selectedUnit?.images || props.images}
            current={props.currentSlide}
            toSlide={props.toSlide}
            display={{ base: 'none', md: 'flex' }}
            hidden={props.slideLength <= 1}
          />
          {hasTimesaleTag(props.categories) && (
            <Box position="absolute" top="0" left="0" zIndex="banner">
              <OptimizedImage
                src="/Label/TimeSaleLabel.svg"
                alt="タイムセールラベル"
                width={80}
                height={80}
              />
            </Box>
          )}
        </GridItem>

        <GridItem w="100%" alignSelf="center" overflow="hidden" p="6">
          {props.brands.map((brand, index) => (
            <Link
              href={{
                pathname: '/brands',
                query: {
                  brandId: brand.id,
                },
              }}
              key={index}
              passHref
            >
              <Box pb="10px">
                <Text textStyle="h5" color="action.link">
                  {brand.name}
                </Text>
              </Box>
            </Link>
          ))}
          <Heading fontSize="16px" mb="2">{`${props.name}`}</Heading>
          {selectedUnit !== undefined && (
            <Flex alignItems="center">
              {hasTimesaleTag(props.categories) ? (
                <PremiumSalePrice
                  textStyle="h1"
                  color="action.notification"
                  iconSize={20}
                >
                  {selectedUnit.price}
                </PremiumSalePrice>
              ) : (
                <PremiumPrice textStyle="h1" iconSize={20}>
                  {selectedUnit.price}
                </PremiumPrice>
              )}
              <SimpleGrid columns={[1, 2]} spacing="1" ml="5">
                <DiscountPrice textStyle="h8" fontWeight="bold" px="2.5">
                  {selectedUnit.originalPrice - selectedUnit.price}
                </DiscountPrice>
                {/* {isParallelImport(selectedUnit.purchaseRoute) && (
                  <TagLabel>並行輸入品</TagLabel>
                )} */}
              </SimpleGrid>
            </Flex>
          )}
          <Flex>
            {selectedUnit !== undefined && (
              <Box>
                <Text
                  fontSize="16px"
                  color="text.300"
                  textDecoration={'line-through'}
                  mb="4"
                >
                  通常価格
                  <Price display="inline" as="span">
                    {selectedUnit.originalPrice}
                  </Price>
                </Text>
              </Box>
            )}
            <Spacer />
            <Box>
              {/* {selectedUnit && isParallelImport(selectedUnit.purchaseRoute) && (
                <Link href="/guide/parallelImport" passHref>
                  <Text
                    color="text.300"
                    fontSize="13px"
                    lineHeight="18px"
                    px="5px"
                    textDecorationLine="underline"
                  >
                    <QuestionIcon />
                    並行輸入品とは
                  </Text>
                </Link>
              )} */}
            </Box>
          </Flex>

          <Text fontSize="14px" fontWeight="bold">
            {varietyType && `${varietyType} /`}&nbsp;
            {varietyChoice ?? '選択されていません'}
          </Text>

          <ValietyPicker
            varieties={varieties ?? []}
            setVarietyChoice={handleVarietyChoice}
            mb="4"
          />
        </GridItem>
      </Grid>
      <DeliveryDescription mx="6" mb="8" membershipGrade={props.membershipGrade} />
      <SafeSecureIconGrid fillColor="#767676" mb="8" mx="6" color="text.300"/>
      <Description mb="4" description={props.description ?? ''} />
      <SafeSecureDescription mx="4" mb="8" />
      <Recommendations productId={props.id} marginBottom="70px" />
      {props.membershipGrade !== undefined ? (
        <ProductDetailFixedButtons
          isSoldOut={selectedUnit && selectedUnit.stock == 0}
          handleAddCart={handleAddCart}
          disableAddCartBtn={disableAddCartBtn}
          isLoadingAddCartBtn={isLoadingAddCartBtn}
          handleUpdateWishlist={handleUpdateWishlist}
          isLoadingUpdateWishlistBtn={isLoadingUpdateWishlistBtn}
          inWishlist={inWishlist}
        />
      ) : (
        <OnboardingLinkFixedButton/>
      )}
    </React.Fragment>
  );
};
