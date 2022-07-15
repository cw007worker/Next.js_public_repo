import { GetProductResponse, getProductSchema } from 'type/response/getProduct';

export const validateGetProduct = (data: unknown): GetProductResponse => {
  const parsed = getProductSchema.parse(data);
  return parsed;
};
