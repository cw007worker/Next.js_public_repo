import { Pagenation } from './common/pagenation';
import { Unit } from './common/unitForProductList';

export type UnitList = {
  units: Unit[];
  pagenation: Pagenation;
};
