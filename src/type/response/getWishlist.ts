import { unitWithProductSchema } from './partial/unit/withProduct';
import { pagenationSchema } from './partial/pagenation';
import { z } from 'zod';

export const getWishlistSchema = z.object({
  units: z.array(unitWithProductSchema),
  pagenation: pagenationSchema,
});

export type GetWishlistResponse = z.infer<typeof getWishlistSchema>;
