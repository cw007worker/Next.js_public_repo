import { z } from 'zod';

export const getItemSearchSuggestKeywordsSchema = z.object({
  keyword: z.string(),
  limit: z.union([z.number(), z.undefined()]),
});

export type GetItemSearchSuggestKeywordsReqest = z.infer<
  typeof getItemSearchSuggestKeywordsSchema
>;
