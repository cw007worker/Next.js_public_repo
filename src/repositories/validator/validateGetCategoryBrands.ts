import {
  getCategoryBrandsSchema,
  GetCategoryBrandsResponse,
} from 'type/response/getCategoryBrands';

export const validateGetCategoryBrands = (
  data: unknown
): GetCategoryBrandsResponse => {
  const parsed = getCategoryBrandsSchema.parse(data);
  return parsed;
};
