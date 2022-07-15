import { BRANDS } from 'constants/brands';
import { BrandContent } from 'type/common/brandContent';

export type HookState = {
  brandContentList: BrandContent[];
};

export const useBrandContents = (): HookState => {
  const brandContentList: BrandContent[] = [];

  // 商品が紐づいてないbrandのtag
  // const noProductBrandList = [
  //   'イヴ･サンローラン（YSL）', // tag_id: 121
  //   'shu uemura(シュウ ウエムラ)', // tag_id: 146
  //   '資生堂プロフェッショナル', // tag_id: 174
  //   'PAUL & JOE(ポール&ジョー)', // tag_id: 161
  //   'NARS(ナーズ)', // tag_id: 158
  //   'SNIDEL BEAUTY', // tag_id: 58
  //   'ローラ メルシエ(laura mercier)', // tag_id: 170
  //   'Kiehl’s(キールズ)', // tag_id: 134
  //   'Kanebo(カネボウ)', // tag_id: 133
  //   'rom&nd', // tag_id: 93
  //   'JILLSTUART (ジル スチュアート)', // tag_id: 148
  //   'Dr.Jart+(ドクタージャルト)', // tag_id: 155
  // ];

  for (const brand of BRANDS) {
    brandContentList.push({
      image: {
        src: brand.imagePath,
        alt: `${brand.name}の画像`,
      },
      href: {
        pathname: 'brands',
        query: {
          brandId: brand.tagId,
        },
      },
    });
  }

  return { brandContentList };
};
