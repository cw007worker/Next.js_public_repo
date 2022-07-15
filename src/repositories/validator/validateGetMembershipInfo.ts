import {
  GetMembershipInfoResponse,
  getMembershipInfoSchema,
} from 'type/response/getMembershipInfo';

export const validateGetMembershipInfo = (
  data: unknown
): GetMembershipInfoResponse => {
  const parsed = getMembershipInfoSchema.parse(data);
  return parsed;
};
