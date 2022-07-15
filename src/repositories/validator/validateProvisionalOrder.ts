import {
  ProvisionalOrderResponse,
  provisionalOrderSchema,
} from 'type/response/provisionalOrder';

export const validateProvisionalOrder = (
  data: unknown
): ProvisionalOrderResponse => {
  const parsed = provisionalOrderSchema.parse(data);
  return parsed;
};
