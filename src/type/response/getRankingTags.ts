import { z } from 'zod';
import { rankingTagWithProductListSchema } from './partial/rankingTag/withProductList';

export const GetRankingTagsSchema = z.object({
  ranking_tags: z.array(rankingTagWithProductListSchema),
});

export type GetRankingTagsResponse = z.infer<typeof GetRankingTagsSchema>;
