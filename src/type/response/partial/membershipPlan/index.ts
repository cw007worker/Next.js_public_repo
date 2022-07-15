import { z } from 'zod';

export const membershipPlanSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  recurring: z.enum(['month', 'year']),
  discount_price: z.number(), // 割引が有効になるのは初回のみ
  is_highlighted: z.boolean(),
});

export type MembershipPlan = z.infer<typeof membershipPlanSchema>;
