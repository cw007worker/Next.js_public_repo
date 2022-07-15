import { z } from 'zod';
import { couponSchema } from './partial/coupon';

export const getUserCouponsSchema = z.object({
  active_coupons: z.array(couponSchema),
  inactive_coupons: z.array(couponSchema),
});

export type GetUserCouponsResponse = z.infer<typeof getUserCouponsSchema>;
