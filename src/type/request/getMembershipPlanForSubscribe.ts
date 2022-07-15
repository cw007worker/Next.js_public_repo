import { z } from 'zod';

export const getMembershipPlanForSubscribeSchema = z.object({
  membership_plan_id: z.number(),
});

export type GetMembershipPlanForSubscribeRequest = z.infer<
  typeof getMembershipPlanForSubscribeSchema
>;
