import { z } from 'zod';
import { brandWithImageSchema } from './partial/brand/withImage';
import { categoryWithChildsSchema } from './partial/category/withChilds';

export const getTagsSchema = z.object({
  brands: z.array(brandWithImageSchema),
  categories: z.array(categoryWithChildsSchema),
});

export type GetTagsResponse = z.infer<typeof getTagsSchema>;
