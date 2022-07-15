import { GetUserCouponsForCartResponse } from 'type/response/getUserCouponsForCart';
import { CouponForCart } from 'type/viewModel/common/couponForCart';
import { CouponsForCart } from 'type/viewModel/couponsForCart';
import { couponDateFormat } from 'utils/dateFormat';
import { isAlmostExpired } from 'utils/expired';

export const toUserCouponsForCart = (
  res: GetUserCouponsForCartResponse
): CouponsForCart => {
  const useableCoupons: CouponForCart[] = res.usable_coupons.map((coupon) => ({
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
    validationResult: {
      totalPrice: coupon.validation_result.total_price,
      totalDiscountPrice: coupon.validation_result.total_discount_price,
    },
  }));

  const unuseableCoupons: CouponForCart[] = res.unusable_coupons.map(
    (coupon) => ({
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
      validationResult: null,
    })
  );

  return {
    useableCoupons,
    unuseableCoupons,
  };
};
