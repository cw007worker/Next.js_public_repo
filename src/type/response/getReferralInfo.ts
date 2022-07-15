import { z } from 'zod';

export const getReferralInfoSchema = z.object({
  referral_code: z.string(),
  referred_total_users: z.number(),
});

export type GetReferralInfoResponse = z.infer<typeof getReferralInfoSchema>;
