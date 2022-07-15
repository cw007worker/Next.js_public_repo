import { z } from 'zod';

export const cartItemSchema = z.object({
  id: z.number(),
  unit_id: z.number(),
  unit_name: z.union([z.string(), z.null()]),
  unit_stock: z.number(),
  unit_quantity: z.number(),
  unit_price: z.number(),
  unit_original_price: z.number(),
  unit_image_url: z.union([z.string(), z.null()]),
  product: z.object({
    id: z.number(),
    name: z.string(),
    description: z.union([z.string(), z.null()]),
    image_url: z.union([z.string(), z.null()]),
  }),
});

export type CartItem = z.infer<typeof cartItemSchema>;
