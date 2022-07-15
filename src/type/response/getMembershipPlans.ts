import { z } from 'zod';
import { membershipPlanSchema } from './partial/membershipPlan';

export const getMembershipPlans = z.object({
  membership_plans: z.array(membershipPlanSchema),
});

export type GetMembershipPlansResponse = z.infer<typeof getMembershipPlans>;
