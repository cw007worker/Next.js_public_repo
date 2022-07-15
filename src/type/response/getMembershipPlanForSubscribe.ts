import { z } from 'zod';
import { membershipPlanSchema } from './partial/membershipPlan';

export const getMembershipPlanForSubscribeSchema = z.object({
  membership_plan: membershipPlanSchema,
});

export type GetMembershipPlanForSubscribeResponse = z.infer<
  typeof getMembershipPlanForSubscribeSchema
>;
