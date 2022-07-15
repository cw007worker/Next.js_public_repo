import { z } from 'zod';
import { paymentWaySchema } from '../paymentWay';

export const userSchema = z.object({
  id: z.number(),
  payment_ways: z.array(paymentWaySchema),
});

export type User = z.infer<typeof userSchema>;
