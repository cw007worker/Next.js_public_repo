import { GetMembershipPlanForSubscribeResponse } from 'type/response/getMembershipPlanForSubscribe';
import { MembershipPlan } from 'type/viewModel/common/membershipPlan';
import { MembershipPlanForSubscribe } from 'type/viewModel/membershipPlanForSubscribe';

export const toMembershipPlanForSubscribe = (
  res: GetMembershipPlanForSubscribeResponse
): MembershipPlanForSubscribe => {
  const membershipPlan: MembershipPlan & { discountPrice: number } = {
    id: String(res.membership_plan.id),
    name: res.membership_plan.name,
    description: res.membership_plan.description,
    price: res.membership_plan.price,
    discountPrice: res.membership_plan.discount_price,
    recurring: res.membership_plan.recurring,
    isHighlighted: res.membership_plan.is_highlighted,
  };
  return {
    membershipPlan: membershipPlan,
  };
};
