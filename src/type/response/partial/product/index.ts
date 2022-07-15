import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  brand_name: z.string(),
  image_urls: z.union([z.array(z.string()), z.null()]),
  description: z.union([z.string(), z.null()]),
  has_variety: z.boolean(),
  has_size: z.boolean(),
});

export type Product = z.infer<typeof productSchema>;
