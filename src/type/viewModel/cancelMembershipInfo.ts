import { MembershipStatus } from './common/membership';
import { StripeSubscription } from './common/stripeSubscription';

export type CancelMembershipInfo = {
  id: number;
  status: MembershipStatus;
  stripeSubscription: StripeSubscription;
};
