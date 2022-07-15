import { z } from 'zod';
import { membershipPlanSchema } from '../membershipPlan';

export const subscriptionSchema = z.object({
  id: z.number(),
  membership_plan: membershipPlanSchema,
});

export type Subscription = z.infer<typeof subscriptionSchema>;
