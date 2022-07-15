import { z } from 'zod';
import { deliverySchema } from './partial/delivery';
import { pagenationSchema } from './partial/pagenation';

export const getDeliveriesSchema = z.object({
  deliveries: z.array(deliverySchema),
  pagenation: pagenationSchema,
});

export type GetDeliveriesResponse = z.infer<typeof getDeliveriesSchema>;
