import { MembershipPlan } from './common/membershipPlan';

export type MembershipPlanForSubscribe = {
  membershipPlan: MembershipPlan & { discountPrice: number };
};
