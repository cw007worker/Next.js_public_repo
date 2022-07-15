import { z } from 'zod';
import { OrderCompletedSchema } from './partial/orderCompleted';

export const getOrderCompletedInfoSchema = z.object({
  order: OrderCompletedSchema
});

export type GetOrderCompletedInfoResponse = z.infer<typeof getOrderCompletedInfoSchema>;
