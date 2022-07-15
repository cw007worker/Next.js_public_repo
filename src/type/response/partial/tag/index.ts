import { z } from 'zod';
import { unitWithProductSchema } from '../unit/withProduct';
import { campaignSchema } from '../campaign';

export const tagSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.union([z.string(), z.null()]),
  campaign: z.union([campaignSchema, z.null()]),
  type: z.enum(['Brand', 'Category']),
});

export type Tag = z.infer<typeof tagSchema>;
