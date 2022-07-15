import { z } from 'zod';

export const deleteCartItemSchema = z.object({
  unit_id: z.number(),
});

export type DeleteCartItem = z.infer<typeof deleteCartItemSchema>;
