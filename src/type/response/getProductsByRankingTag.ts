import { pagenationSchema } from './partial/pagenation';
import { z } from 'zod';
import { rankingTagSchema } from './partial/rankingTag';
import { productWithUnitSchema } from './partial/product/withUnit';

export const getProductsByRankingTagSchema = z.object({
  ranking_tag: rankingTagSchema,
  products: z.array(productWithUnitSchema),
  pagenation: pagenationSchema,
});

export type GetProductsByRankingTagResponse = z.infer<
  typeof getProductsByRankingTagSchema
>;
