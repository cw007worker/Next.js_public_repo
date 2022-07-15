import {
  getBrandUnitsSchema,
  GetBrandUnitsResponse,
} from 'type/response/getBrandUnits';

export const validateGetBrandUnits = (data: unknown): GetBrandUnitsResponse => {
  const parsed = getBrandUnitsSchema.parse(data);
  return parsed;
};
