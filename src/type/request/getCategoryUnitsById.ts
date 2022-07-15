import { z } from 'zod';

export const getCategoryUnitsByIdSchema = z.object({
  id: z.number(),
  page: z.number(),
  per: z.union([z.number(), z.undefined()]), // 何軒ごとに取得するのか指定（任意）
  sort: z.union([
    z.enum(['recommended', '-created_at', 'created_at', 'price', '-price']),
    z.undefined(),
  ]),
  brand_ids: z.union([z.string(), z.undefined()]),
});

export type GetCategoryUnitsByIdRequest = z.infer<
  typeof getCategoryUnitsByIdSchema
>;
