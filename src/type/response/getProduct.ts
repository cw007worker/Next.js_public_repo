import { z } from 'zod';
import { defaultUnitSchema, uniqueUnitSchema } from './partial/unit';

export const getProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  brand_name: z.string(),
  description: z.union([z.string(), z.null()]),
  image_urls: z.union([z.array(z.string()), z.null()]),
  has_size: z.boolean(),
  has_variety: z.boolean(),
  units: z.union([z.array(uniqueUnitSchema), z.array(defaultUnitSchema)]), //FYI:在庫管理における単品単位
  brand_tags: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  category_tags: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
});

export type GetProductResponse = z.infer<typeof getProductSchema>;
