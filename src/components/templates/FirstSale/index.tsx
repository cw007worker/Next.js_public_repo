import { AspectRatio, Box } from '@chakra-ui/layout';
import { Loading } from 'components/molecules/Loading';
import { BrandContents } from 'components/organisms/BrandContents';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { FirstSaleRankingContents } from 'components/organisms/FirstSale/RankingContents';
import { ProductCardSlideContent } from 'components/organisms/ProductCardSlideContent';
import { ProductListWithTabs } from 'components/organisms/ProductListWithTabs';
import { HookState } from 'hooks/pages/useFirstSalePage';
import {
  bannerFirstSaleRegister,
  bannerFirstSaleTop,
} from 'utils/bannerManager';
import { FirstSaleTableOfContents } from 'components/organisms/FirstSale/TableOfContents';
import { BannerContent } from 'components/organisms/BannerContent';
import { FirstSaleSpringSale } from 'components/organisms/FirstSale/SpringSale';

export const FirstSaleTemplate = (props: HookState) => {
  const {
    springSaleState,
    hallOfFameState,
    hotTopicOnSnsState,
    rankingContents,
    brandContents,
    productListWithTab,
    bannerContents,
  } = props;
  return (
    <Box>
      {/* 会員登録バナー */}
      <BannerContent content={bannerFirstSaleRegister} ratio={4.69} mb="2.5" />
      {/* 「新春セール2022」バナー */}
      <BannerContent content={bannerFirstSaleTop} ratio={1.49} />
      {/* 目次 */}
      <FirstSaleTableOfContents />
      {/* 新春セール */}
      <Box id="springSale">
        <FirstSaleSpringSale {...springSaleState} />
      </Box>
      {/* 人気ランキングから探す */}
      <Box id="popularityRanking">
        {rankingContents.state?.type === 'error' ? (
          <ErrorFetchFaild
            message="コンテンツが取得できませんでした。"
            includeSubMessage={false}
          />
        ) : rankingContents.state?.type === 'loaded' ? (
          <FirstSaleRankingContents
            contents={rankingContents.state?.data}
            handleMore={rankingContents.handleMore}
          />
        ) : (
          <Loading />
        )}
      </Box>
      {/* 殿堂入りコスメ */}
      <Box id="hallOfFame">
        <ProductCardSlideContent
          bgGradient="linear(to-b, #FFE8AC, #F3D78E)"
          bgImage="/FirstSale/GoldGrain.svg"
          contents={hallOfFameState.contents}
          title={hallOfFameState.title}
        />
      </Box>
      {/* SNSで話題のコスメ */}
      <Box id="hotTopicOnSns">
        <ProductCardSlideContent
          bgGradient="linear(to-br, #FAA9A3, #F2C085)"
          bgImage="/FirstSale/GoldGrain.svg"
          contents={hotTopicOnSnsState.contents}
          title={hotTopicOnSnsState.title}
        />
      </Box>
      {/* バナー達 */}
      {bannerContents.map((content, i) => (
        <AspectRatio key={i} id={content.image.alt} ratio={1.1574}>
          <BannerContent content={content} />
        </AspectRatio>
      ))}
      {/* ブランド特集 */}
      <BrandContents
        title="ブランド特集"
        brandContentList={brandContents.brandContentList}
        bgColor="#FAFAFA"
      />
      {/* タブに紐づく商品一覧 */}
      <Box id="tab">
        <ProductListWithTabs {...productListWithTab} bgColor="#FAFAFA" />
      </Box>
    </Box>
  );
};
