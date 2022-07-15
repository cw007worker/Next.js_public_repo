import { Campaign } from './campaign';
import { Unit } from './unitForProductList';

export type TimesaleTag = {
  id: number;
  name: string;
  campaign: Campaign;
  units: Unit[];
};
