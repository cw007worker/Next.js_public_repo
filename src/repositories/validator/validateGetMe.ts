import { GetMeResponse, getMeSchema } from 'type/response/getMe';

export const validateGetMe = (data: unknown): GetMeResponse => {
  const parsed = getMeSchema.parse(data);
  return parsed;
};
