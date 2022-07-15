import { z } from 'zod';

export const addWishlistSchema = z.object({
  unit_id: z.number(),
});

export type AddWishlist = z.infer<typeof addWishlistSchema>;
