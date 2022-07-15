import { z } from 'zod';
import { cartItemSchema } from './partial/cartItem';

export const getCartSchema = z.object({
  current_cart: z.object({
    id: z.number(),
    total_delivery_fee: z.number(),
    cart_items: z.array(cartItemSchema),
  }),
});

export type GetCartResponse = z.infer<typeof getCartSchema>;
