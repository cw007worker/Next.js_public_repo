/**
 * Bannerのオブジェクトを作成するUtil
 */
 import {
  BANNERS,
} from 'constants/banners';
import {
  BannerContents,
  BannerContent,
  BannerContentOnlyImage,
} from 'type/common/bannerContent';

// tag idからバナーを取得する
export const getBannerImage = (
  sourceId: Number,
  sourceType: 'Brand' | 'Tag' | 'Ranking'
): BannerContentOnlyImage | undefined => {
  let result = undefined;
  Object.values(BANNERS).forEach((banner, i) => {
    if (banner.sourceId === sourceId && banner.sourceType === sourceType) {
      result = {
        image: {
          src: banner.ImagePath,
          alt: `${banner.sourceType}${banner.sourceId}の画像`,
        },
      };
    }
  });
  return result;
};

// ページ最上部のアプリ導線バナー
export const bannerTopAppInstall: BannerContent = {
  image: {
    src: BANNERS.bannerTopAppInstall.ImagePath,
    alt: 'bannerTopAppInstall',
  },
  href: {
    pathname: 'https://apps.apple.com/jp/app/pantrii/id1600594589',
  },
};

// ページ最上部のバナー
export const bannerPageTopContent: BannerContent = {
  image: {
    src: BANNERS.bannerWeeklyNewProducts.ImagePath,
    alt: 'bannerWeeklyNewProducts',
  },
  href: {
    pathname: '/itemList',
  },
};

// ページ上部のバナー
export const bannerTopContents: BannerContents = [
  {
    image: {
      src: BANNERS.bannerHairCare.ImagePath,
      alt: 'bannerHairCare'
    },
    href: {
      pathname: 'categories',
      query: { categoryId: BANNERS.bannerHairCare.sourceId, displayColor: true },
    }
  },
  {
    image: {
      src: BANNERS.bannerWeeklyPickupProduct.ImagePath,
      alt: 'bannerWeeklyPickupProduct'
    },
    href: {
      pathname: 'categories',
      query: { categoryId: BANNERS.bannerWeeklyNewProducts.sourceId, displayColor: true },
    }
  },
  {
    image: {
      src: BANNERS.bannerNewArrival.ImagePath,
      alt: 'bannerNewArrival'
    },
    href: {
      pathname: 'newItemList',
    }
  },
  {
    image: {
      src: BANNERS.bannerSummerMake.ImagePath,
      alt: 'bannerSummerMake'
    },
    href: {
      pathname: 'categories',
      query: { categoryId: BANNERS.bannerSummerMake.sourceId, displayColor: true },
    }
  },
  {
    image: {
      src: BANNERS.bannerRomAnd.ImagePath,
      alt: 'bannerRomAnd'
    },
    href: {
      pathname: 'brands',
      query: { brandId: BANNERS.bannerRomAnd.sourceId, displayColor: true },
    }
  },
  {
    image: {
      src: BANNERS.bannerDiorRanking.ImagePath,
      alt: 'bannerDiorRanking'
    },
    href: {
      pathname: 'ranking',
      query: { tag: BANNERS.bannerDiorRanking.sourceId },
    }
  },
  {
    image: {
      src: BANNERS.bannerBaseMakeRanking.ImagePath,
      alt: 'bannerBaseMakeRanking'
    },
    href: {
      pathname: 'ranking',
      query: { tag: BANNERS.bannerBaseMakeRanking.sourceId },
    }
  },
];

// ページ上部のバナー for メンバーシップユーザーじゃない人
export const bannerTopContentsForNonMembership: BannerContents = [
  {
    image: {
      src: BANNERS.bannerSafeSecure.ImagePath,
      alt: 'bannerSafeSecure',
    },
    href: {
      pathname: 'guide/safeSecure',
    },
  },
];

// トップページ上部のグリッドで表示するバナー
export const bannerTopContentsForGrid: BannerContents = [
  {
    image: {
      src: BANNERS.bannerGuaranteeMini.ImagePath,
      alt: 'bannerGuaranteeMini',
    },
    href: {
      pathname: 'guide/guarantee',
    },
  },
  {
    image: {
      src: BANNERS.bannerSafeSecureMini.ImagePath,
      alt: 'bannerSafeSecureMini',
    },
    href: {
      pathname: 'guide/safeSecure',
    },
  },
];

// 元が取れるバナー
export const bannerCanGetReturn: BannerContent = {
  image: {
    src: BANNERS.bannerCanGetReturn.ImagePath,
    alt: 'bannerCanGetReturn',
  },
  href: {
    pathname: 'categories',
    query: { categoryId: BANNERS.bannerCanGetReturn.sourceId },
  },
};

// ページ中部のバナー
export const bannerPageBottomContent: BannerContentOnlyImage = {
  image: {
    src: BANNERS.bannerAnnouncement.ImagePath,
    alt: 'bannerAnnouncement',
  },
};

// TOPページの1番上のバナーリスト
export const bannerContentsOne: BannerContents = [
  {
    image: {
      src: BANNERS.bannerKoreanCosme.ImagePath,
      alt: 'bannerKoreanCosme',
    },
    href: {
      pathname: 'categories',
      query: { categoryId: BANNERS.bannerKoreanCosme.sourceId },
    },
  },
  {
    image: {
      src: BANNERS.bannerDracos.ImagePath,
      alt: 'bannerDracos',
    },
    href: {
      pathname: 'categories',
      query: { categoryId: BANNERS.bannerDracos.sourceId },
    },
  },
];

// TOPページの2番目のバナーリスト
export const bannerContentsTwo: BannerContents = [
  {
    image: {
      src: BANNERS.bannerCanGetReturnHorizontal.ImagePath,
      alt: 'bannerCanGetReturnHorizontal',
    },
    href: {
      pathname: 'categories',
      query: { categoryId: BANNERS.bannerCanGetReturnHorizontal.sourceId },
    },
  },
  {
    image: {
      src: BANNERS.bannerWeeklyPickupProduct.ImagePath,
      alt: 'bannerWeeklyPickupProduct',
    },
    href: {
      pathname: 'categories',
      query: { categoryId: BANNERS.bannerWeeklyPickupProduct.sourceId },
    },
  },
];

// TOPページの3番目のバナーリスト
export const bannerContentsThree: BannerContents = [
  {
    image: {
      src: BANNERS.bannerSpringOfficeMake.ImagePath,
      alt: 'bannerSpringOfficeMake',
    },
    href: {
      pathname: 'categories',
      query: { categoryId: BANNERS.bannerSpringOfficeMake.sourceId },
    },
  },
  {
    image: {
      src: BANNERS.bannerOrganicCosmetic.ImagePath,
      alt: 'bannerOrganicCosmetic',
    },
    href: {
      pathname: 'categories',
      query: { categoryId: BANNERS.bannerOrganicCosmetic.sourceId },
    },
  },
];

// 初売りLPのバナー
export const bannerFirstSale: BannerContent = {
  image: {
    src: BANNERS.bannerFirstSale.ImagePath,
    alt: 'bannerFirstSale',
  },
  href: {
    pathname: 'firstSale',
  },
};
export const bannerFirstSaleRegister: BannerContent = {
  image: {
    src: BANNERS.bannerFirstSaleRegister.ImagePath,
    alt: 'bannerFirstSaleRegister',
  },
  href: {
    pathname: 'onboarding',
  },
};
export const bannerFirstSaleTop: BannerContentOnlyImage = {
  image: {
    src: BANNERS.bannerFirstSaleTop.ImagePath,
    alt: 'bannerFirstSaleTop',
  },
};

export const bannerFirstSaleContent: BannerContents = [
  {
    image: {
      src: BANNERS.bannerFirstSaleFragrance.ImagePath,
      alt: 'bannerFirstSaleFragrance',
    },
    href: {
      pathname: 'categories',
      query: { categoryId: Number(process.env.NEXT_PUBLIC_FRAGRANCE_TAG_ID) },
    },
  },
];
