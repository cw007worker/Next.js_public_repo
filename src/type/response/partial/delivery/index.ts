import { orderItemSchema } from '../orderItem';
import { z } from 'zod';
import { orderSchema } from '../order';

export const deliverySchema = z.object({
  id: z.number(),
  delivery_status: z.enum(['unconfirmed', 'unshipped', 'shipped']),
  shipping_number: z.string().nullable(),
  shipment_date: z.string().nullable(),
  cost: z.number(),
  order: orderSchema,
  order_items: z.array(orderItemSchema),
});

export type DeliveryResponse = z.infer<typeof deliverySchema>;
