import { productWithUnitSchema } from './partial/product/withUnit';
import { tagSchema } from './partial/tag';
import { pagenationSchema } from './partial/pagenation';
import { z } from 'zod';

export const getProductsByTagSchema = z.object({
  tag: tagSchema,
  products: z.array(productWithUnitSchema),
  pagenation: pagenationSchema,
});

export type GetProductsByTagResponse = z.infer<typeof getProductsByTagSchema>;
