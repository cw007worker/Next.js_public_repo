// Bannerがタグに紐づく商品一覧以外のリンクにも遷移するようになったら、targetHref的なプロパティ名を追加する
// nameは一旦わかりやすいように日本語にする
export const BANNERS = {
  bannerAnnouncement: {
    ImagePath: '/Banner/BannerAnnouncement.jpg',
    sourceId: Number(process.env.NEXT_PUBLIC_LIP_TAG_ID),
    sourceType: 'Tag',
  },
  bannerDracos: {
    ImagePath: '/Banner/BannerDracos.jpg',
    sourceId: Number(process.env.NEXT_PUBLIC_DRUGSTORE_COSME_TAG_ID),
    sourceType: 'Tag',
  },
  bannerNewArrival: {
    ImagePath: '/Banner/BannerNewArrival.jpg',
    sourceId: null,
    sourceType: null,
  },
  bannerSummerMake: {
    ImagePath: '/Banner/BannerSummerMake.jpg',
    sourceId: 364,
    sourceType: 'Tag',
  },
  bannerRomAnd: {
    ImagePath: '/Banner/BannerRomAnd2.jpg',
    sourceId: 93,
    sourceType: 'Brand',
  },
  bannerDiorRanking: {
    ImagePath: '/Banner/BannerDiorRanking.jpg',
    sourceId: 11,
    sourceType: 'Ranking',
  },
  bannerBaseMakeRanking: {
    ImagePath: '/Banner/BannerBaseMakeRanking.jpg',
    sourceId: 3,
    sourceType: 'Ranking',
  },
  bannerKoreanCosme: {
    ImagePath: '/Banner/BannerKoreanCosme.jpg',
    sourceId: Number(process.env.NEXT_PUBLIC_KOREAN_COSME_TAG_ID),
    sourceType: 'Tag',
  },
  bannerWeeklyPickupProduct: {
    ImagePath: '/Banner/BannerWeeklyPickupProduct.jpg',
    sourceId: Number(process.env.NEXT_PUBLIC_POPULAR_PRODUCTS_TAG_ID),
    sourceType: 'Tag',
  },
  bannerDior: {
    ImagePath: '/Banner/BannerDior.jpg',
    sourceId: Number(process.env.NEXT_PUBLIC_BRAND_DIOR_TAG_ID),
    sourceType: 'Brand',
  },
  // ここは、新規商品取得APIに置き換える。それまでは一旦、人気商品tagに紐づくものを返却しておく
  bannerWeeklyNewProducts: {
    ImagePath: '/Banner/BannerWeeklyNewProducts.gif',
    sourceId: Number(process.env.NEXT_PUBLIC_POPULAR_PRODUCTS_TAG_ID),
    sourceType: null,
  },
  bannerCanGetReturn: {
    ImagePath: '/Banner/BannerCanGetReturn.jpg',
    sourceId: Number(process.env.NEXT_PUBLIC_CAN_GET_RETURN_TAG_ID),
    sourceType: null,
  },
  bannerCanGetReturnHorizontal: {
    ImagePath: '/Banner/BannerCanGetReturnHorizontal.jpg',
    sourceId: Number(process.env.NEXT_PUBLIC_CAN_GET_RETURN_TAG_ID),
    sourceType: null,
  },
  bannerFregranceComing: {
    ImagePath: '/Banner/BannerFragranceComing.jpg',
    sourceId: Number(process.env.NEXT_PUBLIC_FRAGRANCE_TAG_ID),
    sourceType: null,
  },
  bannerCoachComing: {
    ImagePath: '/Banner/BannerCoachComing.jpg',
    sourceId: Number(process.env.NEXT_PUBLIC_COACH_TAG_ID),
    sourceType: null,
  },
  bannerSpringOfficeMake: {
    ImagePath: '/Banner/BannerSpringOfficeMake.jpg',
    sourceId: Number(process.env.NEXT_PUBLIC_SPRING_OFFICE_MAKE_TAG_ID),
    sourceType: null,
  },
  bannerOrganicCosmetic: {
    ImagePath: '/Banner/BannerOrganicCosme.jpg',
    sourceId: Number(process.env.NEXT_PUBLIC_ORGANIC_COSME_TAG_ID),
    sourceType: null,
  },
  bannerSpringNewlyCosme: {
    ImagePath: '/Banner/BannerSpringNewlyCosme.jpg',
    sourceId: Number(process.env.NEXT_PUBLIC_NEW_SPRING_PRODUCTS_TAG_ID),
    sourceType: null,
  },
  bannerSafeSecure: {
    ImagePath: '/Banner/BannerSafeSecure.jpg',
    sourceId: null,
    sourceType: null,
  },
  bannerSafeSecureMini: {
    ImagePath: '/Banner/BannerSafeSecureMini.jpg',
    sourceId: null,
    sourceType: null,
  },
  bannerGuarantee: {
    ImagePath: '/Banner/BannerGuarantee.jpg',
    sourceId: null,
    sourceType: null,
  },
  bannerGuaranteeMini: {
    ImagePath: '/Banner/BannerGuaranteeMini.jpg',
    sourceId: null,
    sourceType: null,
  },
  bannerAppInstall: {
    ImagePath: '/Banner/BannerAppInstall.jpg',
    sourceId: null,
    sourceType: null,
  },
  bannerTopAppInstall: {
    ImagePath: '/Banner/BannerTopAppInstall.jpg',
    sourceId: null,
    sourceType: null,
  },
  bannerReferral: {
    ImagePath: '/Banner/BannerReferral.jpg',
    sourceId: null,
    sourceType: null,
  },
  bannerComingsoonPopularNewBrand: {
    ImagePath: '/Banner/BannerComingsoonPopularNewBrand.jpg',
    sourceId: null,
    sourceType: null,
  },
  // 初売りLPのバナー
  bannerFirstSale: {
    ImagePath: '/Banner/BannerFirstSale.jpg',
    sourceId: null,
    sourceType: null,
  },
  bannerFirstSaleRegister: {
    ImagePath: '/Banner/BannerFirstSaleRegister.jpg',
    sourceId: null,
    sourceType: null,
  },
  bannerFirstSaleTop: {
    ImagePath: '/Banner/BannerFirstSaleTop.jpg',
    sourceId: null,
    sourceType: null,
  },
  bannerFirstSaleFreeShipping: {
    ImagePath: '/Banner/BannerFirstSaleFreeShipping.jpg',
    sourceId: null,
    sourceType: null,
  },
  bannerFirstSaleFragrance: {
    ImagePath: '/Banner/BannerFirstSaleFragrance.jpg',
    sourceId: null,
    sourceType: null,
  },
  bannerHairCare: {
    ImagePath: '/Banner/BannerHairCare.jpg',
    sourceId: 363,
    sourceType: 'Tag',
  },
  // 並行輸入品を販促する用バナー
  bannerPromotionParallelImport: {
    ImagePath: '/Banner/PromotionParallelImport/BannerSaleItem.jpg',
    sourceId: Number(process.env.NEXT_PUBLIC_TEMPORARY_SALE_ITEMS_TAG_ID),
    sourceType: null,
  },

  // asset
  bannerRomNd: {
    ImagePath: '/Banner/BannerRomNd1.jpg', // Banner/BannerRomNd2.jpg
    sourceId: Number(process.env.NEXT_PUBLIC_ROM_ND_TAG_ID),
    sourceType: 'Brand',
  }
} as const;
