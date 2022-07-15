import { z } from 'zod';

export const getDeliveriesSchema = z.object({
  status: z.enum([
    'all',
    'order.payment_failed',
    'unconfirmed',
    'unshipped',
    'shipped',
  ]),
  per: z.number(),
  page: z.number(),
});

export type GetDeliveriesRequest = z.infer<typeof getDeliveriesSchema>;
