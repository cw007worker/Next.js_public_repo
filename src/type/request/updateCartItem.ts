import { z } from 'zod';

export const updateCartItemSchema = z.object({
  quantity: z.union([z.number(), z.undefined()]),
  unit_id: z.number(),
});

export type UpdateCartItem = z.infer<typeof updateCartItemSchema>;
