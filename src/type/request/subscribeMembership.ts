import { z } from 'zod';

export const subscribeMembershipSchema = z.object({
  membership_plan_id: z.number(),
  card_token: z.string(),
  first_name: z.string(),
  last_name: z.string(),
});

export type SubscribeMembershipRequest = z.infer<
  typeof subscribeMembershipSchema
>;
