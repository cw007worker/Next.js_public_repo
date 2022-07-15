import {
  CancelMembershipResponse,
  cancelMembershipSchema,
} from 'type/response/cancelMembership';

export const validateCancelMembership = (
  data: unknown
): CancelMembershipResponse => {
  const parsed = cancelMembershipSchema.parse(data);
  return parsed;
};
