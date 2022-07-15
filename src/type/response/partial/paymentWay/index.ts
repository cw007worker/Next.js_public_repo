import { z } from 'zod';

export const paymentWaySchema = z.object({
  payment_method_id: z.string(),
  type: z.string(),
  brand: z.string(),
  last4: z.string(),
  exp_month: z.number(),
  exp_year: z.number(),
  is_default: z.boolean(),
  is_default_for_subscription: z.boolean(),
});

export type PaymentWay = z.infer<typeof paymentWaySchema>;
