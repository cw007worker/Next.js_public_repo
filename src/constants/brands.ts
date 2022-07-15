export const findBrand = (name: string) => {
  let brand = BRANDS.find((b) => b.name === name);
  if (brand === undefined) throw new Error('ブランドが見つかりません');

  return brand;
};

export type BrandConst = {
  tagId: number;
  name: string;
  imagePath: string;
};

export const BRANDS: BrandConst[] = [
  {
    tagId: Number(process.env.NEXT_PUBLIC_AMPLITUDE_TAG_ID),
    name: 'Amplitude',
    imagePath: '/Brand/Amplitude.jpg',
  }, //ok
  {
    tagId: Number(process.env.NEXT_PUBLIC_BOBBI_BROWN_TAG_ID),
    name: 'BOBBI BROWN',
    imagePath: '/Brand/BOBBIBROWN.jpg',
  }, //ok
  {
    tagId: Number(process.env.NEXT_PUBLIC_CELVOKE_TAG_ID),
    name: 'Celvoke',
    imagePath: '/Brand/Celvoke.jpg',
  }, //ok
  {
    tagId: Number(process.env.NEXT_PUBLIC_CLINIQUE_TAG_ID),
    name: 'CLINIQUE',
    imagePath: '/Brand/CLINIQUE.jpg',
  }, //ok
  {
    tagId: Number(process.env.NEXT_PUBLIC_CLARINS_TAG_ID),
    name: 'CLARINS',
    imagePath: '/Brand/CLARINS.jpg',
  }, //ok
  {
    tagId: Number(process.env.NEXT_PUBLIC_CNP_LABORATORY_TAG_ID),
    name: 'CNP Laboratory',
    imagePath: '/Brand/CNPLaboratory.jpg',
  }, //ok
  {
    tagId: Number(process.env.NEXT_PUBLIC_CHANEL_TAG_ID),
    name: 'CHANEL',
    imagePath: '/Brand/CHANEL.jpg',
  }, //ok
  {
    tagId: Number(process.env.NEXT_PUBLIC_DIOR_TAG_ID),
    name: 'DIOR',
    imagePath: '/Brand/DIOR.jpg',
  }, //ok
  // {
  //   tagId: Number(process.env.NEXT_PUBLIC_DR_JART_TAG_ID),
  //   name: 'Dr.Jart+(ドクタージャルト)',
  //   imagePath: '/Brand/DrJart.jpg',
  // },
  {
    tagId: Number(process.env.NEXT_PUBLIC_ESTEE_LAUDER_TAG_ID),
    name: 'Estee Lauder',
    imagePath: '/Brand/EsteeLauder.jpg',
  }, //ok
  {
    tagId: Number(process.env.NEXT_PUBLIC_ETVOS_TAG_ID),
    name: 'ETVOS',
    imagePath: '/Brand/ETVOS.jpg',
  }, //ok
  {
    tagId: Number(process.env.NEXT_PUBLIC_JILLSTUART_TAG_ID),
    name: 'JILLSTUART',
    imagePath: '/Brand/JILLSTUART.jpg',
  },
  // {
  //   tagId: Number(process.env.NEXT_PUBLIC_KANEBO_TAG_ID),
  //   name: 'Kanebo(カネボウ)',
  //   imagePath: '/Brand/Kanebo.jpg',
  // },
  // {
  //   tagId: Number(process.env.NEXT_PUBLIC_KIEHLS_TAG_ID),
  //   name: 'Kiehl’s(キールズ)',
  //   imagePath: '/Brand/Kiehls.jpg',
  // },
  // {
  //   tagId: Number(process.env.NEXT_PUBLIC_LAURA_MERCIER_TAG_ID),
  //   name: 'ローラ メルシエ(laura mercier)',
  //   imagePath: '/Brand/LauraMercier.jpg',
  // },
  {
    tagId: Number(process.env.NEXT_PUBLIC_LOCCITANE_TAG_ID),
    name: "L'OCCITANE",
    imagePath: '/Brand/LOCCITANE.jpg',
  }, //ok
  {
    tagId: Number(process.env.NEXT_PUBLIC_MAC_TAG_ID),
    name: 'M・A・C',
    imagePath: '/Brand/MAC.jpg',
  }, //ok
  // {
  //   tagId: Number(process.env.NEXT_PUBLIC_SNIDEL_BEAUTY_TAG_ID),
  //   name: 'SNIDEL BEAUTY',
  //   imagePath: '/Brand/SNIDELBEAUTY.jpg',
  // },
  {
    tagId: Number(process.env.NEXT_PUBLIC_THE_BODY_SHOP_TAG_ID),
    name: 'THE BODY SHOP',
    imagePath: '/Brand/THEBODYSHOP.jpg',
  }, //ok
  {
    tagId: Number(process.env.NEXT_PUBLIC_TOO_FACED_TAG_ID),
    name: 'Too Faced',
    imagePath: '/Brand/TooFaced.jpg',
  }, //ok
  // {
  //   tagId: Number(process.env.NEXT_PUBLIC_TO_ONE_TAG_ID),
  //   name: 'to/one',
  //   imagePath: '/Brand/ToOne.jpg',
  // }, //ok
  {
    tagId: Number(process.env.NEXT_PUBLIC_YSL_TAG_ID),
    name: 'イヴ･サンローラン（YSL）',
    imagePath: '/Brand/YSL.jpg',
  },
  {
    tagId: Number(process.env.NEXT_PUBLIC_IPSA_TAG_ID),
    name: 'IPSA(イプサ)',
    imagePath: '/Brand/IPSA.jpg',
  }, //ok
  {
    tagId: Number(process.env.NEXT_PUBLIC_DECORTE_TAG_ID),
    name: 'DECORTE',
    imagePath: '/Brand/DECORTE.jpg',
  }, //ok
  {
    tagId: Number(process.env.NEXT_PUBLIC_ROM_ND_TAG_ID),
    name: 'rom&nd',
    imagePath: '/Brand/RomNd.jpg',
  },
  {
    tagId: Number(process.env.NEXT_PUBLIC_ROM_VT_COSMETICS_TAG_ID),
    name: 'VT COSMETICS',
    imagePath: '/Brand/VT_COSMETICS.jpg',
  },
  {
    tagId: Number(process.env.NEXT_PUBLIC_NARS_TAG_ID),
    name: 'NARS(ナーズ)',
    imagePath: '/Brand/NARS.jpg',
  },
  {
    tagId: Number(process.env.NEXT_PUBLIC_ORBIS_TAG_ID),
    name: 'ORBIS',
    imagePath: '/Brand/ORBIS.jpg',
  }, //ok
  {
    tagId: Number(process.env.NEXT_PUBLIC_PAUL_JOE_TAG_ID),
    name: 'PAUL & JOE(ポール&ジョー)',
    imagePath: '/Brand/PAULJOE.jpg',
  },
  // {
  //   tagId: Number(process.env.NEXT_PUBLIC_ROM_ND_TAG_ID),
  //   name: 'rom&nd',
  //   imagePath: '/Brand/RomNd.jpg',
  // },
  // {
  //   tagId: Number(process.env.NEXT_PUBLIC_SHISEIDO_TAG_ID),
  //   name: '資生堂プロフェッショナル',
  //   imagePath: '/Brand/Shiseido.jpg',
  // },
  {
    tagId: Number(process.env.NEXT_PUBLIC_SHU_UEMURA_TAG_ID),
    name: 'shu uemura(シュウ ウエムラ)',
    imagePath: '/Brand/ShuUemura.jpg',
  },
];
