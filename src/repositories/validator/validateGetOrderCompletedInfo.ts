import {
  GetOrderCompletedInfoResponse,
  getOrderCompletedInfoSchema,
} from 'type/response/getOrderCompletedInfo';

export const validateGetOrderCompletedInfo = (data: unknown): GetOrderCompletedInfoResponse => {
  const parsed = getOrderCompletedInfoSchema.parse(data);
  return parsed;
};
