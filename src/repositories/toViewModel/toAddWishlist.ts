import { AddWishlistResponse } from 'type/response/addWishlist';

export const toAddWishlist = (
  res: AddWishlistResponse
): { wishlistId: number | null } => {
  return {
    wishlistId: res.wishlist_id,
  };
};
