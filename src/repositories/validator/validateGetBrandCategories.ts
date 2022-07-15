import {
  getBrandCategoriesSchema,
  GetBrandCategoriesResponse,
} from 'type/response/getBrandCategories';

export const validateGetBrandCategories = (
  data: unknown
): GetBrandCategoriesResponse => {
  const parsed = getBrandCategoriesSchema.parse(data);
  return parsed;
};
