import { Pagenation } from './common/pagenation';
import { RankingTag } from './common/rankingTag';
import { Tag } from './common/tag';

export type ProductListByRankingTag = {
  rankingTag: RankingTag;
  pagenation: Pagenation;
};
