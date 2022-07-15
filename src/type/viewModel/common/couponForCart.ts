import { Coupon } from './coupon';

export type CouponForCart = {
  validationResult: {
    totalPrice: number;
    totalDiscountPrice: number;
  } | null;
} & Coupon;
