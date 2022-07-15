import { GetMembershipInfoResponse } from 'type/response/getMembershipInfo';
import { CancelMembershipInfo } from 'type/viewModel/cancelMembershipInfo';
import { StripeSubscription } from 'type/viewModel/common/stripeSubscription';
import { dateFormat } from 'utils/dateFormat';

export const toCancelMembershipInfo = (
  res: GetMembershipInfoResponse
): CancelMembershipInfo => {
  const s = res.membership.stripe_subscription;
  const stripeSubscription: StripeSubscription = {
    contractStartDate: dateFormat(new Date(s.contract_start_date)),
    currentPeriodEndDate: dateFormat(new Date(s.current_period_end_date)),
    willCancelAtPeriodEnd: s.will_cancel_at_period_end,
    status: s.status,
  };

  return {
    id: res.membership.id,
    status: res.membership.status,
    stripeSubscription: stripeSubscription,
  };
};
