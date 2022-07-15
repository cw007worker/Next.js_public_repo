import {
  getMembershipPlans,
  GetMembershipPlansResponse,
} from 'type/response/getMembershipPlans';

export const validateGetMembersipPlans = (
  data: unknown
): GetMembershipPlansResponse => {
  const parsed = getMembershipPlans.parse(data);
  return parsed;
};
