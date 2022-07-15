import { GetUnitsResponse, getUnitsSchema } from 'type/response/getUnits';

export const validateGetUnits = (data: unknown): GetUnitsResponse => {
  const parsed = getUnitsSchema.parse(data);
  return parsed;
};
