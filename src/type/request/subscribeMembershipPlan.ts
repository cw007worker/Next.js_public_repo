import { z } from 'zod';

export const subscribeMembershipPlanSchema = z.object({
  membership_plan_id: z.number(),
  membership_id: z.number(),
});

export type SubscribeMembershipPlanRequest = z.infer<
  typeof subscribeMembershipPlanSchema
>;
