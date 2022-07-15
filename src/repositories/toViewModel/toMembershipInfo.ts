import { PaymentWay } from 'type/viewModel/common/paymentWay';
import { dateFormat } from 'utils/dateFormat';
import { GetMembershipInfoResponse } from 'type/response/getMembershipInfo';
import { MembershipInfo } from 'type/viewModel/membershipInfo';
import { StripeSubscription } from 'type/viewModel/common/stripeSubscription';
import { SubscribedMembershipPlan } from 'type/viewModel/common/subscribedMembershipPlan';

export const toMembershipInfo = (
  res: GetMembershipInfoResponse
): MembershipInfo => {
  const s = res.membership.stripe_subscription;
  const stripeSubscription: StripeSubscription = {
    contractStartDate: dateFormat(new Date(s.contract_start_date)),
    currentPeriodEndDate: dateFormat(new Date(s.current_period_end_date)),
    willCancelAtPeriodEnd: s.will_cancel_at_period_end,
    status: s.status,
  };

  const paymentWays: PaymentWay[] = res.membership.user.payment_ways.map(
    (p) => {
      return {
        stripeCardId: p.payment_method_id,
        brand: p.brand,
        last4: p.last4,
        expMonth: p.exp_month,
        expYear: p.exp_year,
        isDefaultPaymentWay: p.is_default,
        isDefaultPaymentWayForSubscription: p.is_default_for_subscription,
      };
    }
  );

  const currentSubscribedMembershipPlan: SubscribedMembershipPlan = {
    id: res.membership.subscription.id,
    membershipPlanid: res.membership.subscription.membership_plan.id,
    name: res.membership.subscription.membership_plan.name,
    price: res.membership.subscription.membership_plan.price,
    recurring: res.membership.subscription.membership_plan.recurring,
    isHighlighted: res.membership.subscription.membership_plan.is_highlighted,
  };

  return {
    id: res.membership.id,
    status: res.membership.status,
    stripeSubscription: stripeSubscription,
    paymentWays: paymentWays,
    currentSubscribedMembershipPlan: currentSubscribedMembershipPlan,
  };
};
