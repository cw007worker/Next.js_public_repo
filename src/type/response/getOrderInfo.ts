import { shippingAddressSchema } from './partial/shippingAddress';
import { cartItemSchema } from './partial/cartItem';
import { z } from 'zod';
import { paymentWaySchema } from './partial/paymentWay';

export const getOrderInfoSchema = z.object({
  total_price: z.number(),
  subtotal_price: z.number(),
  total_delivery_fee: z.number(),
  usage_points: z.number(),
  cart_items: z.array(cartItemSchema),
  payment_ways: z.array(paymentWaySchema),
  shipping_address: z.union([shippingAddressSchema, z.null()]),
});

export type GetOrderInfoResponse = z.infer<typeof getOrderInfoSchema>;
