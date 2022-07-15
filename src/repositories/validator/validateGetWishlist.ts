import {
  GetWishlistResponse,
  getWishlistSchema,
} from 'type/response/getWishlist';

export const validateGetWishlist = (data: unknown): GetWishlistResponse => {
  const parsed = getWishlistSchema.parse(data);
  return parsed;
};
