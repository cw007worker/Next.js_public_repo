import { z } from 'zod';

export const orderItemSchema = z.object({
  id: z.number(),
  product_id: z.number(),
  unit_id: z.number(),
  name: z.string(),
  unit_price: z.number(),
  unit_original_price: z.number(),
  quantity: z.number(),
  unit_image_url: z.string().nullable(),
  product_image_url: z.string().nullable(),
});

export type OrderItem = z.infer<typeof orderItemSchema>;
