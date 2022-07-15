import {
  GetPartialUnitsResponse,
  getPartialUnitsSchema,
} from 'type/response/getPartialUnits';

export const validateGetPartialUnits = (
  data: unknown
): GetPartialUnitsResponse => {
  const parsed = getPartialUnitsSchema.parse(data);
  return parsed;
};
