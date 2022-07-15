import { z } from 'zod';
import { brandWithImageSchema } from './partial/brand/withImage';

export const getCategoryBrandsSchema = z.object({
  brands: z.array(brandWithImageSchema),
});

export type GetCategoryBrandsResponse = z.infer<typeof getCategoryBrandsSchema>;
