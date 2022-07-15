import {
  GetOrderInfoResponse,
  getOrderInfoSchema,
} from 'type/response/getOrderInfo';

export const validateGetOrderInfo = (data: unknown): GetOrderInfoResponse => {
  const parsed = getOrderInfoSchema.parse(data);
  return parsed;
};
