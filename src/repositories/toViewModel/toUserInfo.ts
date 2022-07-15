import { GetUserInfoResponse } from 'type/response/getUserInfo';
import { UserInfo } from 'type/viewModel/userInfo';

export const toUserInfo = (res: GetUserInfoResponse): UserInfo => {
  return {
    firstName: res.first_name,
    lastName: res.last_name,
    deliveriesSummary: {
      unconfirmedDeliveriesCount:
        res.deliveries_summary.unconfirmed_deliveries_count,
      unshippedDeliveriesCount:
        res.deliveries_summary.unshipped_deliveries_count,
      shippedDeliveriesCount: res.deliveries_summary.shipped_deliveries_count,
    },
  };
};
