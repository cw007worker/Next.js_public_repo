import { z } from 'zod';

export const campaignSchema = z.object({
  start_at: z.string(),
  end_at: z.string(),
  is_held: z.boolean(),
});

export type Campaign = z.infer<typeof campaignSchema>;
