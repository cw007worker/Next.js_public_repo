import {
  GenerateSignInLinkResponse,
  generateSignInLinkResponseSchema,
} from 'type/response/generateSignInLink';

export const validateGenarateSignInLink = (
  data: unknown
): GenerateSignInLinkResponse => {
  const parsed = generateSignInLinkResponseSchema.parse(data);
  return parsed;
};
