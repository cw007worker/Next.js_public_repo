import { Unit } from 'type/viewModel/common/unitForProductList';

export type ProductForRanking = {
  id: number;
  name: string;
  brandName: string;
  images:
    | {
        alt: string;
        url: string;
      }[]
    | undefined;
  description: string | undefined;
  hasVariety: boolean;
  hasSize: boolean;
  unit: Unit;
  ranking: number;
};
