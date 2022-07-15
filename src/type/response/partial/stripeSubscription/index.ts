import { z } from 'zod';

export const stripeSubscriptionSchema = z.object({
  contract_start_date: z.string(),
  current_period_end_date: z.string(),
  will_cancel_at_period_end: z.boolean(),
  status: z.string(),
});

export type StripeSubscription = z.infer<typeof stripeSubscriptionSchema>;
