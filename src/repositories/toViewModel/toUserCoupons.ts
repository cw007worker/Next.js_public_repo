import { GetUserCouponsResponse } from 'type/response/getUserCoupons';
import { Coupon } from 'type/viewModel/common/coupon';
import { UserCoupons } from 'type/viewModel/common/userCoupons';
import { couponDateFormat } from 'utils/dateFormat';
import { isAlmostExpired } from 'utils/expired';

export const toUserCoupons = (res: GetUserCouponsResponse): UserCoupons => {
  const activeCoupons: Coupon[] = res.active_coupons.map((coupon) => ({
    id: coupon.id,
    code: coupon.code,
    active: coupon.active,
    campaignName: coupon.campaign_name,
    discountType: coupon.discount_type,
    discount:
      coupon.discount.type === 'PERCENT'
        ? {
            percentOff: coupon.discount.percent_off,
            effect: coupon.discount.effect,
          }
        : {
            amountOff: coupon.discount.amount_off,
            effect: coupon.discount.effect,
          },
    startDate: couponDateFormat(new Date(coupon.start_date)),
    expirationDate:
      coupon.expiration_date === null
        ? null
        : couponDateFormat(new Date(coupon.expiration_date)),
    isAlmostExpired:
      coupon.expiration_date === null
        ? false
        : isAlmostExpired(new Date(coupon.expiration_date)),
  }));

  const inactiveCoupons: Coupon[] = res.inactive_coupons.map((coupon) => ({
    id: coupon.id,
    code: coupon.code,
    active: coupon.active,
    campaignName: coupon.campaign_name,
    discountType: coupon.discount_type,
    discount:
      coupon.discount.type === 'PERCENT'
        ? {
            percentOff: coupon.discount.percent_off,
            effect: coupon.discount.effect,
          }
        : {
            amountOff: coupon.discount.amount_off,
            effect: coupon.discount.effect,
          },
    startDate: couponDateFormat(new Date(coupon.start_date)),
    expirationDate:
      coupon.expiration_date === null
        ? null
        : couponDateFormat(new Date(coupon.expiration_date)),
    isAlmostExpired:
      coupon.expiration_date === null
        ? false
        : isAlmostExpired(new Date(coupon.expiration_date)),
  }));

  return {
    activeCoupons,
    inactiveCoupons,
  };
};
