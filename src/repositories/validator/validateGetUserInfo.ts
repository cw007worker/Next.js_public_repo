import {
  GetUserInfoResponse,
  getUserInfoSchema,
} from 'type/response/getUserInfo';

export const validateGetUserInfo = (data: unknown): GetUserInfoResponse => {
  const parsed = getUserInfoSchema.parse(data);
  return parsed;
};
