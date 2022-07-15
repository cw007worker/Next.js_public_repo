import { z } from 'zod';
import { productWithUnitSchema } from '../product/withUnit';

export const rankingTagWithProductListSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.union([z.string(), z.null()]),
  products: z.array(productWithUnitSchema),
});

export type RankingTag = z.infer<typeof rankingTagWithProductListSchema>;
