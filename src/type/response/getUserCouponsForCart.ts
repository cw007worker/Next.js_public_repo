import { couponForCartSchema } from './partial/coupon/forCart';
import { couponSchema } from './partial/coupon';
import { z } from 'zod';

export const getUserCouponsForCartSchema = z.object({
  usable_coupons: z.array(couponForCartSchema),
  unusable_coupons: z.array(couponSchema),
});

export type GetUserCouponsForCartResponse = z.infer<
  typeof getUserCouponsForCartSchema
>;
