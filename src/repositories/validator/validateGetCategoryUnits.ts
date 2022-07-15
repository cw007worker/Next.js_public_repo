import {
  getCategoryUnitsSchema,
  GetCategoryUnitsResponse,
} from 'type/response/getCategoryUnits';

export const validateGetCategoryProducts = (
  data: unknown
): GetCategoryUnitsResponse => {
  const parsed = getCategoryUnitsSchema.parse(data);
  return parsed;
};
