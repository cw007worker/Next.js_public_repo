import { Pagenation } from './common/pagenation';
import { Unit } from './common/unitForProductList';

export type ProductListByTag = {
  units: Unit[];
  pagenation: Pagenation;
};
