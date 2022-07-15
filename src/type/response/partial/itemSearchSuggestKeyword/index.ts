import { z } from 'zod';

export const itemSearchSuggestKeywordsSchema = z.object({
  keyword: z.string(),
});

export type ItemSearchSuggestKeywords = z.infer<
  typeof itemSearchSuggestKeywordsSchema
>;
