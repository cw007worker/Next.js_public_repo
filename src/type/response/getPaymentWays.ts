import { z } from 'zod';
import { paymentWaySchema } from './partial/paymentWay';

export const getPaymentWaysSchema = z.object({
  payment_ways: z.array(paymentWaySchema),
});

export type GetPaymentWaysResponse = z.infer<typeof getPaymentWaysSchema>;
