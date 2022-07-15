import { Coupon } from './coupon';

export type UserCoupons = {
  activeCoupons: Coupon[];
  inactiveCoupons: Coupon[];
};
