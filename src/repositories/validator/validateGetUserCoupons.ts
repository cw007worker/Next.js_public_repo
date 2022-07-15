import {
  GetUserCouponsResponse,
  getUserCouponsSchema,
} from 'type/response/getUserCoupons';

export const validateGetUserCoupons = (
  data: unknown
): GetUserCouponsResponse => {
  const parsed = getUserCouponsSchema.parse(data);
  return parsed;
};
