import { AddUserCouponResponse } from 'type/response/addUserCoupon';
import { Coupon } from 'type/viewModel/common/coupon';
import { couponDateFormat } from 'utils/dateFormat';
import { isAlmostExpired } from 'utils/expired';

export const toAddUserCoupon = (res: AddUserCouponResponse): Coupon => {
  return {
    id: res.id,
    code: res.code,
    active: res.active,
    campaignName: res.campaign_name,
    discountType: res.discount_type,
    discount:
      res.discount.type === 'PERCENT'
        ? {
            percentOff: res.discount.percent_off,
            effect: res.discount.effect,
          }
        : {
            amountOff: res.discount.amount_off,
            effect: res.discount.effect,
          },
    startDate: couponDateFormat(new Date(res.start_date)),
    expirationDate:
      res.expiration_date === null
        ? null
        : couponDateFormat(new Date(res.expiration_date)),
    isAlmostExpired:
      res.expiration_date === null
        ? false
        : isAlmostExpired(new Date(res.expiration_date)),
  };
};
