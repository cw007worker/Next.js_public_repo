import { z } from 'zod';

export const getProductsByWishlistSchema = z.object({
  page: z.number(), //何ページ目を取得するのか指定
  per: z.union([z.number(), z.undefined()]), // 何軒ごとに取得するのか指定（任意）
});

export type GetProductByWishlistsRequest = z.infer<
  typeof getProductsByWishlistSchema
>;
