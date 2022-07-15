import { Pagenation } from './common/pagenation';
import { Unit } from './common/unitForProductList';

export type Wishlist = {
  units: Unit[];
  pagenation: Pagenation;
};
