import { Pagenation } from './common/pagenation';
import { Tag } from './common/tag';

export type ProductListByTag = {
  tag: Tag;
  pagenation: Pagenation;
};
