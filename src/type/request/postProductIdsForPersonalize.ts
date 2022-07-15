import { z } from 'zod';

export const postProductIdsForPersonalizeSchema = z.object({
  product_ids: z.array(z.string()), //3つまで
});

export type PostProductIdsForPersonalize = z.infer<
  typeof postProductIdsForPersonalizeSchema
>;
