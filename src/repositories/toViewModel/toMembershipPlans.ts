import { GetMembershipPlansResponse } from 'type/response/getMembershipPlans';
import { MembershipPlan } from 'type/viewModel/common/membershipPlan';
import { MembershipPlans } from 'type/viewModel/membershipPlans';

export const toMembershipPlans = (
  res: GetMembershipPlansResponse
): MembershipPlans => {
  const membershipPlans: MembershipPlan[] = res.membership_plans.map(
    (membership_plan) => {
      return {
        id: String(membership_plan.id),
        name: membership_plan.name,
        description: membership_plan.description,
        price: membership_plan.price,
        recurring: membership_plan.recurring,
        isHighlighted: membership_plan.is_highlighted,
      };
    }
  );
  return {
    membershipPlans: membershipPlans,
  };
};
