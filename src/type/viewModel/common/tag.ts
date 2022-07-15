import { Unit } from './unitForProductList';
import { Campaign } from './campaign';

export type Tag = {
  id: number;
  name: string;
  description: string | undefined;
  campaign: Campaign | undefined;
  units: Unit[];
  type: 'Category' | 'Brand';
};
