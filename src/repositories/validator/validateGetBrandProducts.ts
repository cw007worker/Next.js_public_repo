import {
  getBrandProductsSchema,
  GetBrandProductsResponse,
} from 'type/response/getBrandProducts';

export const validateGetBrandProducts = (
  data: unknown
): GetBrandProductsResponse => {
  const parsed = getBrandProductsSchema.parse(data);
  return parsed;
};
