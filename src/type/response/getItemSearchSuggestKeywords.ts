import { itemSearchHistorySchema } from './partial/itemSearchHistory';
import { z } from 'zod';

export const getItemSearchSuggestKeywordsSchema = z.object({
  item_search_suggest_keywords: z.array(itemSearchHistorySchema),
});

export type GetItemSearchSuggestKeywordsResponse = z.infer<
  typeof getItemSearchSuggestKeywordsSchema
>;
