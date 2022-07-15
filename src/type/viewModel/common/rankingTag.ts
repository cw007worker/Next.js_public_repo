import { ProductForRanking } from './productForRanking';

export type RankingTag = {
  id: number;
  name: string;
  description: string | undefined;
  products: ProductForRanking[];
};
