import { z } from 'zod';

export const deleteWishlistSchema = z.object({
  wishlist_id: z.number(),
});

export type DeleteWishlist = z.infer<typeof deleteWishlistSchema>;
