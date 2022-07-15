import { z } from 'zod';

export const provisionalOrderSchema = z.object({
  payment_way_id: z.string(),
  shipping_address_id: z.number(),
  coupon_code: z.string().optional(),
});

export type ProvisionalOrder = z.infer<typeof provisionalOrderSchema>;
