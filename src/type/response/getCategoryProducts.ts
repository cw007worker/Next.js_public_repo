import { productWithUnitSchema } from './partial/product/withUnit';
import { pagenationSchema } from './partial/pagenation';
import { categorySchema } from './partial/category';
import { z } from 'zod';

export const getCategoryProductsSchema = z.object({
  category: categorySchema,
  products: z.array(productWithUnitSchema),
  pagenation: pagenationSchema,
});

export type GetCategoryProductsResponse = z.infer<
  typeof getCategoryProductsSchema
>;
