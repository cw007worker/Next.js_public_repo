import { Campaign } from './common/campaign';
import { Unit } from './common/unitForProductList';

export type PartialUnits = {
  id: number;
  name: string;
  description: string | null;
  campaign: Campaign | null;
  units: Unit[];
  type: 'Category' | 'Brand';
};
