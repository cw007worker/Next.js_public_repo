import {
  GetDeliveriesResponse,
  getDeliveriesSchema,
} from 'type/response/getDeliveries';

export const validateGetDeliveries = (data: unknown): GetDeliveriesResponse => {
  const parsed = getDeliveriesSchema.parse(data);
  return parsed;
};
