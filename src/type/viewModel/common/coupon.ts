import { Discount } from './discount';

export type Coupon = {
  id: string;
  code: string;
  active: boolean;
  campaignName: string;
  discountType: 'PERCENT' | 'AMOUNT';
  discount: Discount;
  startDate: string;
  expirationDate: string | null;
  isAlmostExpired: boolean; //もうすぐ有効期限か切れるか
};
