import {
  GetPaymentWaysResponse,
  getPaymentWaysSchema,
} from 'type/response/getPaymentWays';

export const validateGetPaymentWays = (
  data: unknown
): GetPaymentWaysResponse => {
  const parsed = getPaymentWaysSchema.parse(data);
  return parsed;
};
