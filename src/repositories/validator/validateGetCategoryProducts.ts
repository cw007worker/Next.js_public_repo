import {
  getCategoryProductsSchema,
  GetCategoryProductsResponse,
} from 'type/response/getCategoryProducts';

export const validateGetCategoryProducts = (
  data: unknown
): GetCategoryProductsResponse => {
  const parsed = getCategoryProductsSchema.parse(data);
  return parsed;
};
