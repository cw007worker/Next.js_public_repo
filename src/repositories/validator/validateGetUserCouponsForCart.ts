import {
  GetUserCouponsForCartResponse,
  getUserCouponsForCartSchema,
} from 'type/response/getUserCouponsForCart';

export const validateGetUserCouponsForCart = (
  data: unknown
): GetUserCouponsForCartResponse => {
  const parsed = getUserCouponsForCartSchema.parse(data);
  return parsed;
};
