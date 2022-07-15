import { z } from 'zod';
import { deliverySummarySchema } from './partial/deliverySummary';

export const getUserInfoSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  deliveries_summary: deliverySummarySchema,
});

export type GetUserInfoResponse = z.infer<typeof getUserInfoSchema>;
