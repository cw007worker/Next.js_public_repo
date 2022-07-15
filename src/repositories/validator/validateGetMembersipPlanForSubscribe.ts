import {
  GetMembershipPlanForSubscribeResponse,
  getMembershipPlanForSubscribeSchema,
} from 'type/response/getMembershipPlanForSubscribe';

export const validateGetMembersipPlanForSubscribe = (
  data: unknown
): GetMembershipPlanForSubscribeResponse => {
  const parsed = getMembershipPlanForSubscribeSchema.parse(data);
  return parsed;
};
