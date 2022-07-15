import { getInitialCharacter } from './../utils/initialCharacter';
import { BRANDS as MAINBRANDS } from './brands';

const getSubBrands = (
  mainBrands: {
    tagId: number;
    name: string;
    imagePath: string;
  }[]
): {
  tagId: number;
  name: string;
  imagePath: string;
}[] => {
  const set = new Set([...mainBrands.map((mb) => mb.tagId)]);
  const subBrands: {
    tagId: number;
    name: string;
    imagePath: string;
  }[] = [];
  ALL_BRANDS.forEach((ab) => {
    if (!set.has(ab.tagId)) {
      subBrands.push(ab);
    } else {
      //no-op
    }
  });
  return subBrands;
};

/**
 * NOTE: API で管理するようになったら、
 * src/utils/getBrandWithInitial の処理と被っているので、utilsの方の処理を使用するよう修正する
 */
const getBrandsWithInitial = (): {
  initialCharacter: string;
  data: {
    tagId: number;
    name: string;
    imagePath: string;
  }[];
}[] => {
  const brandsWithInitial: {
    initialCharacter: string;
    data: {
      tagId: number;
      name: string;
      imagePath: string;
    }[];
  }[] = [];
  const otherBrands: {
    initialCharacter: string;
    data: {
      tagId: number;
      name: string;
      imagePath: string;
    }[];
  } = {
    initialCharacter: 'その他',
    data: [],
  };
  const initialCharacters: string[] = [];
  ALL_BRANDS.forEach((ab) => {
    const initial = getInitialCharacter(ab.name);
    if (initial) {
      const index = initialCharacters.indexOf(initial);
      if (brandsWithInitial[index]) {
        brandsWithInitial[index].data.push(ab);
      } else {
        initialCharacters.push(initial);
        brandsWithInitial.push({
          initialCharacter: initial,
          data: [ab],
        });
      }
    } else {
      otherBrands.data.push(ab);
    }
  });

  if (otherBrands.data.length > 0) {
    return [...brandsWithInitial, otherBrands];
  } else {
    return brandsWithInitial;
  }
};

type Search = {
  categories: {
    tagId: number;
    name: string;
    imagePath: string;
  }[];
  brands: {
    main: {
      tagId: number;
      name: string;
      imagePath: string;
    }[];
    sub: {
      tagId: number;
      name: string;
      imagePath: string;
    }[];
  };
};

/**
 * 商品が紐づかないtagIdはコメントアウトしておく
 * [113, 115, 116, 117, 118, 119, 120, 121, 122, 123, 125,
 *  126, 131, 132, 133, 134, 135, 136, 137, 138, 139, 141,
 *  142, 143, 145, 146, 148, 149, 150, 151, 152, 153, 154,
 *  155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165,
 *  166, 167, 168, 170, 171, 172, 173, 174, 175]
 *
 * 公開ステータスの商品が紐づかないtagIdもコメントアウトしておく
 * [43, 49, 53, 54, 58, 59, 64, 67, 68, 70, 71, 72, 74, 76, 77, 78, 79, 80]
 */

const ALL_BRANDS = [
  { tagId: 117, name: 'ADDICTION', imagePath: '' },
  { tagId: 42, name: "A'pieu", imagePath: '' },
  { tagId: 273, name: 'ALBION（アルビオン）', imagePath: '' },
  { tagId: 99, name: 'ANESSA', imagePath: '' },
  { tagId: 96, name: 'AUBE', imagePath: '' },
  { tagId: 20, name: 'Amplitude', imagePath: '' },
  { tagId: 21, name: 'B.A', imagePath: '' },
  { tagId: 29, name: 'BOBBI BROWN', imagePath: '' },
  { tagId: 35, name: 'CHANEL', imagePath: '' },
  { tagId: 44, name: 'CLARINS', imagePath: '' },
  { tagId: 45, name: 'CLINIQUE', imagePath: '' },
  { tagId: 46, name: 'CNP Laboratory', imagePath: '' },
  { tagId: 62, name: "COFFRET D'OR", imagePath: '' },
  { tagId: 16, name: 'Celvoke', imagePath: '' },
  { tagId: 88, name: 'Chacott', imagePath: '' },
  { tagId: 90, name: 'スカルプD ', imagePath: '' },
  { tagId: 140, name: 'DECORTÉ(コスメデコルテ)', imagePath: '' },
  { tagId: 23, name: 'DIOR', imagePath: '' },
  { tagId: 100, name: "DR.BRONNER'S", imagePath: '' },
  { tagId: 98, name: 'ELIXIR', imagePath: '' },
  { tagId: 47, name: 'ESPRIQUE', imagePath: '' },
  { tagId: 28, name: 'ETVOS', imagePath: '' },
  { tagId: 26, name: 'Estee Lauder', imagePath: '' },
  { tagId: 31, name: 'FIVEISM  THREE', imagePath: '' },
  { tagId: 95, name: 'FilliMilli', imagePath: '' },
  { tagId: 36, name: 'GUERLAIN', imagePath: '' },
  { tagId: 48, name: 'HABA', imagePath: '' },
  { tagId: 178, name: 'Huxley', imagePath: '' },
  { tagId: 263, name: 'innisfree', imagePath: '' },
  { tagId: 266, name: 'JILL STUART', imagePath: '' },
  { tagId: 65, name: 'INTEGRATE', imagePath: '' },
  { tagId: 181, name: 'IPSA(イプサ)', imagePath: '' },
  {
    tagId: 147,
    name: 'Jo Malone London(ジョー マローン ロンドン)',
    imagePath: '',
  },
  { tagId: 97, name: 'KIRSH', imagePath: '' },
  { tagId: 101, name: 'Kailijumei', imagePath: '' },
  { tagId: 276, name: "KIEHL'S（キールズ）", imagePath: '' },
  { tagId: 41, name: 'Koh Gen Do', imagePath: '' },
  { tagId: 264, name: 'La Roche-Posay（ラロッシュポゼ）', imagePath: '' },
  { tagId: 63, name: 'LANAREY', imagePath: '' },
  { tagId: 50, name: "L'OCCITANE", imagePath: '' },
  { tagId: 249, name: 'LUNASOL', imagePath: '' },
  { tagId: 39, name: 'MAC', imagePath: '' },
  { tagId: 25, name: 'MACCHIA LABEL', imagePath: '' },
  { tagId: 89, name: 'MAJOLICA MAJORCA', imagePath: '' },
  { tagId: 38, name: 'MAKE UP FOR EVER', imagePath: '' },
  { tagId: 85, name: 'MAQuillAGE', imagePath: '' },
  { tagId: 69, name: 'MARY QUANT', imagePath: '' },
  { tagId: 83, name: 'MISSHA', imagePath: '' },
  { tagId: 51, name: 'Melvita', imagePath: '' },
  { tagId: 18, name: 'MiMC', imagePath: '' },
  { tagId: 94, name: 'Milk Touch', imagePath: '' },
  { tagId: 52, name: 'N by ONLY MINERALS', imagePath: '' },
  { tagId: 240, name: 'NARS', imagePath: '' },
  { tagId: 75, name: 'ONE THING', imagePath: '' },
  { tagId: 33, name: 'ONLY MINERALS', imagePath: '' },
  { tagId: 55, name: 'ORBIS', imagePath: '' },
  { tagId: 56, name: 'OSAJI', imagePath: '' },
  { tagId: 239, name: 'PAUL&JOE（ポール&ジョー）', imagePath: '' },
  { tagId: 87, name: 'Primavista', imagePath: '' },
  { tagId: 115, name: 'RMK', imagePath: '' },
  { tagId: 241, name: 'SUQQU', imagePath: '' },
  { tagId: 57, name: 'SKINFOOD', imagePath: '' },
  { tagId: 238, name: 'shu uemura(シュウ ウエムラ)', imagePath: '' },
  { tagId: 221, name: 'TANGLE TEEZER（タングルティーザー）', imagePath: '' },
  { tagId: 60, name: 'THE BODY SHOP', imagePath: '' },
  { tagId: 218, name: 'THREE', imagePath: '' },
  { tagId: 242, name: 'TOMFORD', imagePath: '' },
  { tagId: 61, name: 'Too Faced', imagePath: '' },
  { tagId: 114, name: 'VT コスメティックス', imagePath: '' },
  { tagId: 34, name: 'colorgram', imagePath: '' },
  { tagId: 91, name: 'd program', imagePath: '' },
  { tagId: 40, name: 'dasique', imagePath: '' },
  { tagId: 180, name: 'hince', imagePath: '' },
  { tagId: 66, name: 'john masters organics', imagePath: '' },
  { tagId: 73, name: 'naturaglace', imagePath: '' },
  { tagId: 187, name: 'product', imagePath: '' },
  { tagId: 93, name: 'rom&nd', imagePath: '' },
];

export const SEARCH = {
  categories: {
    name: 'カテゴリーから探す',
    data: [
      {
        tagId: 13,
        name: 'スキンケア',
        imagePath: '',
        data: [
          { tagId: 190, name: 'クレンジング', imagePath: '' },
          { tagId: 191, name: '洗顔料', imagePath: '' },
          { tagId: 192, name: '化粧水', imagePath: '' },
          { tagId: 193, name: '乳液', imagePath: '' },
          { tagId: 194, name: '美容液/オイル/クリーム', imagePath: '' },
          { tagId: 195, name: 'コットンパフ', imagePath: '' },
          { tagId: 196, name: 'まつ毛/アイケア', imagePath: '' },
          { tagId: 197, name: 'フェイススクラブ/ピーリング', imagePath: '' },
          { tagId: 198, name: 'パック/フェイスマスク', imagePath: '' },
          { tagId: 199, name: 'オールインワンケア', imagePath: '' },
        ],
      },
      {
        tagId: 30,
        name: 'ベースメイク',
        imagePath: '',
        data: [
          { tagId: 200, name: '化粧下地', imagePath: '' },
          { tagId: 201, name: 'ファンデーション', imagePath: '' },
          { tagId: 202, name: 'フェイスパウダー', imagePath: '' },
          { tagId: 203, name: 'コンシーラー', imagePath: '' },
          { tagId: 204, name: 'BB/CCクリーム', imagePath: '' },
        ],
      },
      {
        tagId: 189,
        name: 'メイクアップ',
        imagePath: '',
        data: [
          { tagId: 14, name: 'チーク', imagePath: '' },
          { tagId: 22, name: 'マスカラ', imagePath: '' },
          { tagId: 27, name: 'アイライナー', imagePath: '' },
          { tagId: 32, name: 'アイブロウ', imagePath: '' },
          { tagId: 81, name: 'アイシャドウ', imagePath: '' },
          { tagId: 84, name: 'リップクリーム', imagePath: '' },
          { tagId: 106, name: 'リップ/口紅', imagePath: '' },
          { tagId: 183, name: 'ハイライト', imagePath: '' },
        ],
      },
      {
        tagId: 251,
        name: 'ビューティーグッズ',
        imagePath: '',
        data: [
          { tagId: 195, name: 'コットンパフ', imagePath: '' },
          { tagId: 220, name: 'ヘアブラシ', imagePath: '' },
          { tagId: 252, name: 'アイラッシュカーラー', imagePath: '' },
          { tagId: 253, name: '手鏡/メイクミラー', imagePath: '' },
        ],
      },
      {
        tagId: 219,
        name: 'ボディヘアケア',
        imaegPath: '',
        data: [
          { tagId: 14, name: 'チーク', imagePath: '' },
          { tagId: 254, name: 'シャンプー', imaegPath: '' },
          { tagId: 255, name: 'コンディショナー', imaegPath: '' },
          { tagId: 262, name: 'ボディソープ', imaegPath: '' },
          { tagId: 256, name: 'ヘアオイル/ヘアミルク', imaegPath: '' },
          { tagId: 257, name: 'トリートメント/ヘアパック', imaegPath: '' },
          { tagId: 261, name: 'ボディケア/ボディクリーム', imaegPath: '' },
          { tagId: 258, name: 'ハンドケア/ハンドクリーム', imaegPath: '' },
        ],
      },
      {
        tagId: 182,
        name: 'フレグランス',
        imagePath: '',
        data: [
          { tagId: 259, name: '香水', imagePath: '' },
          { tagId: 260, name: 'ルームフレグランス', imagePath: '' },
        ],
      },
    ],
  },
  brands: {
    name: 'ブランドから探す',
    brandWithInitial: [...getBrandsWithInitial()],
  },
};
