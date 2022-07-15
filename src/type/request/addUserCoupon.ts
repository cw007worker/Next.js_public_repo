import { z } from 'zod';

export const addUserCouponSchema = z.object({
  code: z.string(),
});

export type AddUserCouponRequest = z.infer<typeof addUserCouponSchema>;
