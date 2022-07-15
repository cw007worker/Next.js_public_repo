import { z } from 'zod';

export const getProductsByRankingTagSchema = z.object({
  id: z.number(),
  page: z.number(),
  per: z.union([z.number(), z.undefined()]), // 何軒ごとに取得するのか指定（任意）
});

export type GetProductsByRankingTagRequest = z.infer<
  typeof getProductsByRankingTagSchema
>;
