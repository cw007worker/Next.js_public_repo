import { itemSearchHistorySchema } from './partial/itemSearchHistory';
import { unitWithProductSchema } from './partial/unit/withProduct';
import { pagenationSchema } from './partial/pagenation';
import { z } from 'zod';

export const getItemSearchHistoriesSchema = z.object({
  item_search_histories: z.array(itemSearchHistorySchema),
});

export type GetItemSearchHistoriesResponse = z.infer<
  typeof getItemSearchHistoriesSchema
>;
