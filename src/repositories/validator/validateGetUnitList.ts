import {
  GetUnitListResponse,
  getUnitListSchema,
} from 'type/response/getUnitList';

export const validateGetUnitList = (data: unknown): GetUnitListResponse => {
  const parsed = getUnitListSchema.parse(data);
  return parsed;
};
