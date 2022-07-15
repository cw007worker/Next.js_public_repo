import { z } from 'zod';

export const membershipSchema = z.object({
  id: z.number(),
  status: z.enum(['active', 'will_be_canceled', 'canceled', 'suspended']),
});

export type MembershipPlan = z.infer<typeof membershipSchema>;
