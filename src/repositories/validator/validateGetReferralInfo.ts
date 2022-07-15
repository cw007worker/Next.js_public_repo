import {
  GetReferralInfoResponse,
  getReferralInfoSchema,
} from 'type/response/getReferralInfo';

export const validateGetReferralInfo = (
  data: unknown
): GetReferralInfoResponse => {
  const parsed = getReferralInfoSchema.parse(data);
  return parsed;
};
