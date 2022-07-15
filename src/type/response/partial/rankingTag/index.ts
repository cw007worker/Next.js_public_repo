import { z } from 'zod';

export const rankingTagSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.union([z.string(), z.null()]),
});

export type RankingTag = z.infer<typeof rankingTagSchema>;
