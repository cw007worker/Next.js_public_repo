import {
  AddUserCouponResponse,
  addUserCouponSchema,
} from 'type/response/addUserCoupon';

export const validateAddUserCoupon = (data: unknown): AddUserCouponResponse => {
  const parsed = addUserCouponSchema.parse(data);
  return parsed;
};
