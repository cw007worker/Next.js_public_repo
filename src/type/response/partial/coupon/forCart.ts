import { discountSchema } from '../discount';
import { z } from 'zod';

export const couponForCartSchema = z.object({
  id: z.string(),
  code: z.string(),
  active: z.boolean(),
  campaign_name: z.string(),
  discount_type: z.enum(['PERCENT', 'AMOUNT']),
  discount: discountSchema,
  start_date: z.string(),
  expiration_date: z.string().nullable(),
  validation_result: z.object({
    total_price: z.number(),
    total_discount_price: z.number(),
  }),
});

export type CouponForCart = z.infer<typeof couponForCartSchema>;
