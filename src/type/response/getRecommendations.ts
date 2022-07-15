import { z } from 'zod';
import { pagenationSchema } from './partial/pagenation';
import { unitWithProductSchema } from './partial/unit/withProduct';

export const getRecommendationsSchema = z.object({
  pagenation: pagenationSchema,
  units: z.array(unitWithProductSchema),
});

export type GetRecommendationsResponse = z.infer<
  typeof getRecommendationsSchema
>;
