import { BannerContents } from 'type/common/bannerContent';
import { BANNERS } from 'constants/banners';

export const PARALLEL_IMPORT_CONTENTS = [
  {
    image: '/GuidePage/ParallelImport/QuestionImage3.jpg',
    questionText: `どうしてブランド直営店より安いのでしょう？`,
    answers: [
      {
        main: `○卸値で買い付けしているため`,
        sub: `Pantriiでは、海外で製造・販売されている商品を信頼のおける独自ルートで輸入しています。\n海外の卸業者から卸価格で輸入することができるため、ディスカウント価格で提供できます。`,
      },
      {
        main: `○販売価格を自由に決められるため`,
        sub: `ブランド直営店では決められた定価で販売をおこないますが、当店ではその時々の仕入れ価格により独自に販売価格を設定できるため、ディスカウント価格でご提供できます。`,
      },
      {
        main: `○国内外の販売価格差や為替差益（円高）のため`,
        sub: `同じ商品でも国内と国外で販売価格に差がある場合や、 日本円の価値が海外通貨よりも高い円高のタイミングで仕入先の国で購入したものを日本に輸入することで、国内のブランド直営店よりも安い価格で提供できます。`,
      },
    ],
  },
  {
    image: '/GuidePage/ParallelImport/QuestionImage1.jpg',
    questionText: `商品は日本国内で販売されているものと同じですか？`,
    answers: [
      {
        main: `Pantriiで取り扱っている化粧品は海外で販売されているブランド正規品です。`,
        sub: `ブランド側が販売国によって製品の内容を調整している場合、仕入れ国仕様の製品になります。`,
      },
    ],
  },
  {
    image: '/GuidePage/ParallelImport/QuestionImage2.jpg',
    questionText: `ボトルやパッケージに貼られているシールはなんですか？`,
    answers: [
      {
        main: `輸入販売をおこなうにあたり、法律で定められている表示シールです。`,
        sub: `海外から商品を輸入し販売する場合、商品の販売に関する責任はブランドから輸入販売を行った業者に移ります。\n国に対して商品の責任元を証明するために届け出が必要になります。\n商品の全成分を表示し、その成分をシールとして商品に貼ることが義務付けられているため、商品にシールを貼っています。\n製造・販売元に商品ブランドとは別の会社名が記載されているのは、商品に対する責任を記載の会社が持っていますという意味になります。\n商品の製造はそれぞれのブランドがおこなっている正規品になります。`,
      },
    ],
  },
  {
    image: undefined,
    questionText: `製造・販売元がブランドとは違う会社なのはどうしてですか？`,
    answers: [
      {
        main: `化粧品を輸入販売する際に日本の薬機法(旧薬事法)で定められた表記で、化粧品の輸入免許を持った会社のことを法律上『製造・販売元』と表記します。`,
        sub: `商品に対する責任を記載の会社が持っていますという意味になり、商品の製造はそれぞれのブランドがおこなっています。`,
      },
    ],
  },
];

export const bannerContentsInParallelImportPage: BannerContents = [
  {
    image: {
      src: BANNERS.bannerGuarantee.ImagePath,
      alt: 'bannerGuarantee',
    },
    href: {
      pathname: '/guide/guarantee',
    },
  },
];
