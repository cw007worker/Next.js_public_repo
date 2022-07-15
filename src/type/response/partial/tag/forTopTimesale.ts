import { unitWithProductSchema } from '../unit/withProduct';
import { z } from 'zod';
import { campaignSchema } from '../campaign';

export const timesaleTagSchema = z.object({
  id: z.number(),
  name: z.string(),
  campaign: campaignSchema,
  units: z.array(unitWithProductSchema),
});

export type TimesaleTag = z.infer<typeof timesaleTagSchema>;
