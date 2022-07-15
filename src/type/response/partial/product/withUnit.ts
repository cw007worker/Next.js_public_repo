import { z } from 'zod';
import { unitSchema } from '../unit';

export const productWithUnitSchema = z.object({
  id: z.number(),
  name: z.string(),
  brand_name: z.string(),
  image_urls: z.union([z.array(z.string()), z.null()]),
  description: z.union([z.string(), z.null()]),
  has_variety: z.boolean(),
  has_size: z.boolean(),
  variety_count: z.union([z.null(), z.number()]),
  units_stock_total_count: z.number(),
  unit: unitSchema,
});

export type ProductWithUnit = z.infer<typeof productWithUnitSchema>;
