import { z } from 'zod';

export const productsForPersonalize = z.object({
  id: z.number(),
  image_url: z.string(),
});

export type ProductsForPersonalize = z.infer<typeof productsForPersonalize>;
