import { PaymentWay } from './paymentWay';
import { StripeSubscription } from './stripeSubscription';
import { SubscribedMembershipPlan } from './subscribedMembershipPlan';

export type MembershipStatus =
  | 'active'
  | 'will_be_canceled'
  | 'canceled'
  | 'suspended'
  | 'year';

export type Membership = {
  id: number;
  status: MembershipStatus;
  stripeSubscription: StripeSubscription;
  paymentWays: PaymentWay[];
  currentSubscribedMembershipPlan: SubscribedMembershipPlan;
};
