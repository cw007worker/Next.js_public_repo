import { z } from 'zod';

export const getCategoryBrandsSchema = z.object({
  id: z.string(),
});

export type GetCategoryBrandsRequest = z.infer<typeof getCategoryBrandsSchema>;
