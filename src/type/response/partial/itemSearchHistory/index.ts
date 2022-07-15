import { z } from 'zod';

export const itemSearchHistorySchema = z.object({
  id: z.number(),
  keyword: z.string(),
});

export type ItemSearchHistory = z.infer<typeof itemSearchHistorySchema>;
