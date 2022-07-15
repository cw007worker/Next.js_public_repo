import {
  GetUnitsByTagResponse,
  getUnitsByTagSchema,
} from 'type/response/getUnitsByTag';

export const validateGetUnitsByTag = (data: unknown): GetUnitsByTagResponse => {
  const parsed = getUnitsByTagSchema.parse(data);
  return parsed;
};
