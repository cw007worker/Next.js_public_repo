import { unitWithProductSchema } from './partial/unit/withProduct';
import { campaignSchema } from './partial/campaign';
import { z } from 'zod';

export const getPartialUnitsSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.union([z.string(), z.null()]),
  campaign: z.union([campaignSchema, z.null()]),
  units: z.array(unitWithProductSchema),
  type: z.enum(['Brand', 'Category']),
});

export type GetPartialUnitsResponse = z.infer<typeof getPartialUnitsSchema>;
