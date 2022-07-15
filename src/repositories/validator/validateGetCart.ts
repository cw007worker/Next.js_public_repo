import { GetCartResponse, getCartSchema } from 'type/response/getCart';

export const validateGetCart = (data: unknown): GetCartResponse => {
  const parsed = getCartSchema.parse(data);
  return parsed;
};
