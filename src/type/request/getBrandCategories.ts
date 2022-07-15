import { z } from 'zod';

export const getBrandCategoriesSchema = z.object({
  id: z.string(),
});

export type GetBrandCategoriesRequest = z.infer<
  typeof getBrandCategoriesSchema
>;
