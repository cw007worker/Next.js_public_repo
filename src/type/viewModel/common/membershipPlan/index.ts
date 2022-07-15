export type MembershipPlanRecurring = 'month' | 'year';

export type MembershipPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  recurring: MembershipPlanRecurring;
  isHighlighted: boolean;
};
