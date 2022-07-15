import { z } from 'zod';

export const addWishlistSchema = z.object({
  wishlist_id: z.union([z.number(), z.null()]),
});

export type AddWishlistResponse = z.infer<typeof addWishlistSchema>;
