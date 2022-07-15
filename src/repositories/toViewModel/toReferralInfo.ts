import { GetReferralInfoResponse } from 'type/response/getReferralInfo';
import { ReferralInfo } from 'type/viewModel/referralInfo';

export const toReferralInfo = (res: GetReferralInfoResponse): ReferralInfo => {
  return {
    referralCode: res.referral_code,
    referredCustomers: res.referred_total_users,
  };
};
