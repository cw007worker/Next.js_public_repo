import {
  GetProductsByTagResponse,
  getProductsByTagSchema,
} from 'type/response/getProductsByTag';

export const validateGetProductsByTag = (
  data: unknown
): GetProductsByTagResponse => {
  const parsed = getProductsByTagSchema.parse(data);
  return parsed;
};
