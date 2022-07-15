import { Box, Text, VStack, AspectRatio } from '@chakra-ui/layout';
import { Loading } from 'components/molecules/Loading';
import { SpecialEditionContents } from 'components/organisms/BannerContentsList';
import { ProductListWithTabs } from 'components/organisms/ProductListWithTabs';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { HookState } from 'hooks/pages/useTopPage';
import React from 'react';
import {
  bannerCanGetReturn,
  bannerFirstSale,
  bannerPageBottomContent,
} from 'utils/bannerManager';
import { BrandContents } from 'components/organisms/BrandContents';
import { BannerContent } from 'components/organisms/BannerContent';
import { FirstDiscountBanner } from 'components/organisms/FirstDiscountBanner';
import { CarouselWithLink } from 'components/molecules/CarouselWithLink';
import { PartialUnitsContent } from 'components/organisms/PartialUnitsContent';
import { RankingContents } from 'components/organisms/RankingContents';
import { SearchLinkBar } from 'components/organisms/SearchLinkBar';
import { NewlyProductsNotificationBar } from 'components/organisms/NewlyProductsNotificationBar';
import { ReleasePartyImage } from 'components/molecules/ReleasePartyImage';
import { GridBannerContents } from 'components/organisms/BannerContents/grid';
import { ReferralLink } from 'components/organisms/ReferralLink';
import { PartialUnitsContentSkeleton } from 'components/organisms/Skeleton/partialUnitsContent';
import { Skeleton } from '@chakra-ui/react';

const Component: React.VFC<HookState> = (props) => {
  const {
    productListWithTab,
    topBannerContents,
    brandContents,
    partialUnitsList,
    rankingContents,
  } = props;

  return (
    <Box bg="bg.200">
      {/* <FirstDiscountBanner /> */}
      {/* <NewlyProductsNotificationBar /> */}
      <ReferralLink mt="1" mb="0.5" mx="16px" />
      {topBannerContents.isLoading ? (
        <Box py="2.5">
          <AspectRatio ratio={25 / 12}>
            <Skeleton />
          </AspectRatio>
        </Box>
      ) : (
        <CarouselWithLink
          setActiveIndex={topBannerContents.swiper.setCurrentSlide}
          setSlideLength={topBannerContents.swiper.setSlideLength}
          setSwiperInstance={topBannerContents.swiper.setSwiperInstance}
          prev={topBannerContents.swiper.prevSlide}
          next={topBannerContents.swiper.nextSlide}
          autoPlay={true}
          loop={true}
          contents={topBannerContents.bannerContents}
          py="2.5"
          bg="bg.200"
          ratio={25 / 12}
        />
      )}
      {/* <Box pt="2.5" pb="1" bg="bg.200">
          <BannerContent
            content={bannerPageBottomContent}
            ratio={3.75}
          />
        </Box> */}
      <VStack spacing={4} align="stretch">
        {partialUnitsList.map((p, i) => (
          <Box key={i}>
            {p.state?.type === 'loaded' && p.partialUnits ? (
              <PartialUnitsContent
                key={i}
                partialUnits={p.partialUnits}
                name={p.name}
                handleMore={p.handleMore}
                isNew={p.isNew}
              />
            ) : p.state?.type === 'loading' ? (
              <PartialUnitsContentSkeleton />
            ) : (
              <Box>
                <ErrorFetchFaild
                  message="コンテンツが取得できませんでした。"
                  includeSubMessage={false}
                />
              </Box>
            )}
          </Box>
        ))}
        {/* 人気ランキング */}
        {rankingContents.state?.type === 'error' ? (
          <ErrorFetchFaild
            message="コンテンツが取得できませんでした。"
            includeSubMessage={false}
          />
        ) : rankingContents.state?.type === 'loaded' ? (
          <RankingContents
            contents={rankingContents.state?.data}
            handleMore={rankingContents.handleMore}
          />
        ) : (
          <PartialUnitsContentSkeleton />
        )}
      </VStack>
      {/* <BrandContents brandContentList={brandContents.brandContentList} /> */}
      <ProductListWithTabs {...productListWithTab} />
    </Box>
  );
};

export const TopTemplate = React.memo(Component);
