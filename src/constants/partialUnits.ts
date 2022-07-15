export const PARTIAL_PRODUCTS: {
  tagId: number;
  name: string;
  sort: 'priority' | '-created_at';
  labelType?: 'new';
  moreHref?: {
    pathname: 'newItemList';
  };
}[] = [
  {
    tagId: Number(process.env.NEXT_PUBLIC_BOOMING_POPULARITY_TAG_ID),
    name: '🔥人気沸騰中',
    sort: 'priority',
  },
  {
    tagId: Number('222'),
    name: 'NEW ARRIVAL',
    sort: 'priority',
    labelType: 'new',
    moreHref: { pathname: 'newItemList' },
  },
  {
    tagId: Number('377'),
    name: '人気の韓国コスメ rom&nd特集',
    sort: 'priority',
  },
  {
    tagId: Number('363'),
    name: '梅雨を乗り切るヘアケアアイテム',
    sort: 'priority',
  },
  {
    tagId: Number('364'),
    name: '崩れ知らず！夏メイクの必需品',
    sort: 'priority',
  },
];

export const FIRST_SALE_UNITS = {
  springSale: {
    title: null,
    tagId: Number(process.env.NEXT_PUBLIC_SPRING_SALE_TAG_ID),
    unitIds:
      process.env.NEXT_PUBLIC_SPRING_SALE_UNIT_IDS?.split(' ').map((id) =>
        Number(id)
      ) || [],
  },
  hallOfFame: {
    title: '殿堂入りコスメ',
    tagId: null,
    unitIds:
      process.env.NEXT_PUBLIC_HALL_OF_FAME_UNIT_IDS?.split(' ').map((id) =>
        Number(id)
      ) || [],
  },
  hotTopicOnSns: {
    title: 'SNSで話題のコスメ',
    tagId: null,
    unitIds:
      process.env.NEXT_PUBLIC_HOT_TOPIC_ON_SNS_UNIT_IDS?.split(' ').map((id) =>
        Number(id)
      ) || [],
  },
};
