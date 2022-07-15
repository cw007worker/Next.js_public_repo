import {
  AddWishlistResponse,
  addWishlistSchema,
} from 'type/response/addWishlist';

export const validateAddWishlist = (data: unknown): AddWishlistResponse => {
  const parsed = addWishlistSchema.parse(data);
  return parsed;
};
