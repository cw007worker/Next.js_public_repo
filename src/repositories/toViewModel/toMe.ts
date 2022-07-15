import { GetMeResponse } from 'type/response/getMe';
import { Me } from 'type/viewModel/me';

export const toMe = (res: GetMeResponse): Me => {
  return {
    id: res.id,
    firstName: res.first_name ?? undefined,
    lastName: res.last_name ?? undefined,
    email: res.email,
    hasPassword: res.has_password,
    phoneNumber: res.phone_number ?? undefined,
    membershipGrade: res.membership_grade ?? undefined,
    isMembership: res.is_membership,
    cartItemCount: res.cart_item_count,
    willCancelMembership: res.will_cancel_membership,
    canceledMembership: res.canceled_membership,
  };
};
