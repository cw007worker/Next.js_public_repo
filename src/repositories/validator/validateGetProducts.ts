import {
  GetProductsResponse,
  getProductsSchema,
} from 'type/response/getProducts';

export const validateGetProducts = (data: unknown): GetProductsResponse => {
  const parsed = getProductsSchema.parse(data);
  return parsed;
};
