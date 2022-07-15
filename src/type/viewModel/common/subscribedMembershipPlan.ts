import { MembershipPlanRecurring } from './membershipPlan';

export type SubscribedMembershipPlan = {
  id: number;
  membershipPlanid: number;
  name: string;
  price: number;
  recurring: MembershipPlanRecurring;
  isHighlighted: boolean;
};
