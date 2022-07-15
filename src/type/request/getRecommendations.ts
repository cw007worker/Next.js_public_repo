import { z } from 'zod';

export const getRecommendationsSchema = z.object({
  page: z.number(), //何ページ目を取得するのか指定する
  per: z.union([z.number(), z.undefined()]),
  product_id: z.number(),
});

export type GetRecommendationRequest = z.infer<typeof getRecommendationsSchema>;
