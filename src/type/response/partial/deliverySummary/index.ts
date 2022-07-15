import { z } from 'zod';

export const deliverySummarySchema = z.object({
  unconfirmed_deliveries_count: z.number(),
  unshipped_deliveries_count: z.number(),
  shipped_deliveries_count: z.number(),
});

export type DeliverySummary = z.infer<typeof deliverySummarySchema>;
