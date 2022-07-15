import { Pagenation } from './common/pagenation';
import { Item } from './common/item';

export type ItemList = {
  items: Item[];
  pagenation: Pagenation;
};
