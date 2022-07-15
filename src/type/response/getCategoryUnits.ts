import { pagenationSchema } from './partial/pagenation';
import { categorySchema } from './partial/category';
import { z } from 'zod';
import { unitWithProductSchema } from './partial/unit/withProduct';

export const getCategoryUnitsSchema = z.object({
  category: categorySchema,
  units: z.array(unitWithProductSchema),
  pagenation: pagenationSchema,
});

export type GetCategoryUnitsResponse = z.infer<typeof getCategoryUnitsSchema>;
