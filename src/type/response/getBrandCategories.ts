import { z } from 'zod';
import { categoryWithChildsSchema } from './partial/category/withChilds';

export const getBrandCategoriesSchema = z.object({
  categories: z.array(categoryWithChildsSchema),
});

export type GetBrandCategoriesResponse = z.infer<
  typeof getBrandCategoriesSchema
>;
