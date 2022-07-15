import { couponSchema } from './partial/coupon';
import { z } from 'zod';

export const addUserCouponSchema = couponSchema;

export type AddUserCouponResponse = z.infer<typeof addUserCouponSchema>;
