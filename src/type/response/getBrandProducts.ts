import { productWithUnitSchema } from './partial/product/withUnit';
import { pagenationSchema } from './partial/pagenation';
import { brandSchema } from './partial/brand';
import { z } from 'zod';

export const getBrandProductsSchema = z.object({
  brand: brandSchema,
  products: z.array(productWithUnitSchema),
  pagenation: pagenationSchema,
});

export type GetBrandProductsResponse = z.infer<typeof getBrandProductsSchema>;
